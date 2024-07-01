import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';

import { Avatar } from 'react-native-paper';
import { GiftedChat, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { styles } from './ChatStyles';
import { messageService } from "../../../services/messageService";
import { MaiLoaderComponent } from "../../../components/loaders/MainLoader";
import { RenderBubble } from "../../../components/chat/bubble/RenderBubble";
import { setIsInChat, setNbreOfNotifications, setRefreshNumber, setRendezVous } from "../../../store/userSlice";
import { AlertModal } from "../../../components/modals/alert/AlertModal";
import { useNavigation } from '@react-navigation/native';
import { ConfirmationModal } from "../../../components/modals/confirmation/ConfirmationModal";
import { AppointmentModal } from "../../../components/modals/appointment/Appointment";
import { BackNavigation } from "../../../components/buttons/back/BackNavigation";
import { DetailHeader } from "../../../components/header/main/DetailHeader";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { Icon } from "@rneui/themed";
import { ManageStatusComponent } from "../../../components/ManageStatusComponent";
import apiUrls from "../../../../apiUrls";
import { userServices } from "../../../services/userServices";

const {width} = Dimensions.get('window');

export const ChatScreen = (props) => {

  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitionsLocal, setNbreOfRepetitionsLocal] = useState(0);
  const [isMethodError, setIsMethodError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [canDeleteMesssage, setCanDeleteMesssage] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const [alertInfoRendezVous, setAlertInfoRendezVous] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const user = useSelector(({ user: { selectedUser } }) => selectedUser);
  const rendezVous = useSelector(({ user: { rendezVous } }) => rendezVous);
 
  console.log('user', user);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { participant_id } = jwt_decode(token);

  const resetBooleanStates = () => {
    setLoading(false);
    setIsDeleting(false);
    setIsDeleting(false);
    setVisible(false);
  }

  const checkRendezVous = () => {
    const keys = Object.keys(rendezVous);
    if (keys.length === 0) {
      return false;
    }
    return true;
  }

  const handleConsent = async () => {
    try {
      setLoading(true)
      const result = await messageService.deleteConversation(user.chatId, token);
      resetBooleanStates();
      fetchMessages();
      setResponseResult(result);
      setLoading(false);
    } catch (error) {
      setResponseError(error);
      setIsMethodError(true);
    }
  }

  const fetchMessages = () => {
    resetBooleanStates();
    setIsLoading(true);
    messageService.getConversationsWithContact(token, user.chatId)
      .then((result) => {
        const messages = result.messages.map((item) => {
          return {
            _id: item.id,
            text: item.message,
            createdAt: item.createdAt,
            user: {
              _id: item.user.id === participant_id ? 1 : 2, // 1 serves to set connected user and 2 the guest
              name: item.user.nom,
              avatar: item.user.photo
            }
          }
        });
        setResponseResult(result);
        const sortedMessages = [...messages].reverse();
        setConversations(sortedMessages);
        dispatch(setRendezVous(result.rendezvous));
        setIsLoading(false)
      })
      .catch((error) => {
        setResponseError(error);
      })
  }

  useEffect(() => {
    // Indicate the user is in chat screen
    dispatch(setIsInChat(true));

    // Fetch initial messages
    fetchMessages();

    // Initialize the socket
    const ws = new WebSocket(`${apiUrls.baseSocketUrl}/chat/${user.chatName}/?token=${token}`)
    setSocket(ws);
    ws.onopen = (e) => {
      console.log('connexion established from chat screen !', e);
    }
    ws.onclose = (e) => {
      console.log('connexion closed from chat screen', e);
    }

    ws.onmessage = (e) => {
      const messageReceived = JSON.parse(e.data);

      if (messageReceived.type === 'chat_message') {
          setConversations((previousMessages) => GiftedChat.append(previousMessages, [
          {
            _id: messageReceived.id,
            text: messageReceived.message,
            createdAt: messageReceived.createdAt,
            user: {
              _id: messageReceived.user.id === participant_id ? 1 : 2,
              nom: messageReceived.user.nom,
              avatar: messageReceived.user.photo
            }
          }
        ]));
      }
    }
   return () => {
    // Indicate the user leaves chat
    dispatch(setIsInChat(false));
   } 
}, []);

  const onSend = (messages = []) => {
    if (socket) {
      if (messages[0].text === '') {
        return null;
      }
      socket.send(JSON.stringify({
        type: 'chat_message',
        message: messages[0].text
      }));
    }
  };

  const RenderSend = (props) => {
    return (
      <Send {...props} containerStyle={{
        height: '100%'
      }}>
        <View style={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 20,
          marginLeft: 10,
          backgroundColor: COLORS.WHITE
        }}>
          <Icon name="send"
            type={Platform.OS === 'android' ? "ionicon" : "feather"}
            size={25}
            color="#271d67"
          />
        </View>
      </Send>
    )
  }

  const RenderComposer = (props) => {
    return (
      <Composer {...props}
        textInputStyle={{
          borderColor: '#465199',
          borderWidth: 1,
          color: '#465199',
          padding: 10,
          borderRadius: 10,
          fontFamily: FONTS.POPPINS_REGULAR,
          lineHeight: 22,
          fontSize: SIZES.font,
          maxHeight: 100,
          backgroundColor: COLORS.WHITE,
        }}
      />
    )
  }

  const RenderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar {...props}
          containerStyle={{
            paddingVertical: 5,
            paddingLeft: 10,
            backgroundColor: COLORS.WHITE,
            maxHeight: 120,
            overflow: 'scroll'
          }}
          renderActions={() => {
            return (
              <>
                {!props.noAppointment && <View style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  position: 'relative'
                }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (checkRendezVous()) {
                        setAlertInfoRendezVous({
                          visible: true,
                          title: 'Information',
                          message: "Vous avez déjà un rendez-vous en attente d'approbation !"
                        })
                        return null;
                      }
                      setVisible(true);
                    }}>
                    <Image
                      source={require('../../../components/assets/images/pictos/PICTO_CALENDRIER_RDV.png')}
                      style={{
                        width: 40,
                        height: 40,
                      }} />
                  </TouchableOpacity>
                </View>}
              </>
            )
          }}
          renderComposer={RenderComposer}
        />
      </>
    )
  }

  return (
    <>
      {!props.noHeader && (
        <DetailHeader 
          guestId={(props.user && props.user.userId) ? props.user.userId : user.userId}
        />
      )}
      <View style={{ backgroundColor: '#fff', }}>
        {!props.noBack && <View style={{
          paddingHorizontal: 20,
        }}>
          <BackNavigation
            title={'Messages'}
            goBack={() => {
              dispatch(setRefreshNumber());
              navigation.goBack();
            }}
            paddingVertical={20}
          />
        </View>}
        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {user.photo && user.photo !== "" ? <Avatar.Image size={60} source={{ uri: user.photo }} /> :
              <Avatar.Text size={60}
                label={`${user.name[0]}`}
                labelStyle={{ color: '#fff', fontSize: 16 }}
              />
            }
            <View style={{ 
              width: width >= 600 ? '88%' : '80%',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                            
              }}>
                <Text style={{
                  fontFamily: FONTS.POPPINS_BOLD,
                  color: COLORS.MAIN_BLUE,
                  fontSize: SIZES.font,
                }}>{user.firstname} {user.name} </Text>
                <TouchableOpacity onPress={() => setIsDeleting(true)}>
                  <Image
                    source={require('../../../components/assets/PICTO_Poubelle.png')}
                    style={{
                      width: 25,
                      height: 25,
                    }} />
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View style={{
                  width: '75%'
                }}>
                  <Text style={{
                    fontSize: 13,
                    color: '#5D568D',
                    maxWidth: '100%',
                    lineHeight: 18,
                    marginVertical: 2,
                    marginHorizontal: 4,
                    fontFamily: FONTS.POPPINS_REGULAR
                  }}>{user.role}</Text>
                 {/*  {!user.from_structure ? <Text style={localStyles.text}>{user.organization}</Text> : 
                 <Text style={localStyles.text}>{ user.raison_sociale && user.raison_sociale !== '' ? user.raison_sociale : user.organizationEntity?.adresse_organisation?.ville}</Text>} */}
                </View>
                {!user.from_structure && <View style={{
                  marginTop: 10,
                }}>
                  <Image
                    source={{ uri: `${user.organizationPhoto}` }}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain'
                    }}
                  />
                </View>}
              </View>
            </View>
          </View>
        </View>
      </View>
      {isLoading && <MaiLoaderComponent />}
      {!isLoading && (
        <>
          <GiftedChat
            messages={conversations}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
            infiniteScroll={true}
            messagesContainerStyle={{
              paddingHorizontal: 10,
              backgroundColor: COLORS.WHITE,
            }}
            placeholder="Message"
            optionTintColor="#111"
            alwaysShowSend={true}
            renderSend={RenderSend}
            renderBubble={RenderBubble}
            renderInputToolbar={RenderInputToolbar}
            onLongPress={(context, message) => {
              setMessageToDelete(message);
              setCanDeleteMesssage(true);
            }}
          />
        </>
      )
      }
      <AppointmentModal
        destId={(props.user && props.user.userId) ? props.user.userId : user.userId}
        chatId={user.chatId}
        isVisible={visible}
        closeModal={() => setVisible(false)}
        showConfirmationAlert={() => {
          fetchMessages();
        }}
      />
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          resetBooleanStates();
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
          fetchMessages();
        }}
      />
      <AlertModal
        isAlertVisible={alertInfoRendezVous.visible}
        title={alertInfoRendezVous.title}
        confirmMessage={alertInfoRendezVous.message}
        closeAlert={() => {
          setAlertInfoRendezVous((prevState) => ({ ...prevState, visible: false }));
        }}
      />
      <ConfirmationModal
        confirmMessage={`Voulez-vous supprimer ce message ?`}
        isVisible={canDeleteMesssage}
        loading={deleteInProgress}
        handleDeny={() => setCanDeleteMesssage(false)}
        handleConsent={() => {
          if (socket) {
            socket.send(JSON.stringify({
              type: 'delete',
              id: messageToDelete._id
            }));
            const filteredConversations = conversations.filter(({ _id }) => _id !== messageToDelete._id);
            setConversations(filteredConversations);
            setCanDeleteMesssage(false);
          }
        }}
      />
      <ConfirmationModal
        confirmMessage={`Toute la conversation avec ${user.firstname} ${user.name} sera supprimée. Etes-vous sûr(e) de continuer ?`}
        isVisible={isDeleting}
        loading={loading}
        handleDeny={() => setIsDeleting(false)}
        handleConsent={async () => await handleConsent()}
      />
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitionsLocal}
          isStatusError={true}
          handleActionOnError={async () => {
            if (isMethodError) {
              setResponseError(null)
              return null;
            }
            fetchMessages();
            setNbreOfRepetitionsLocal((prevState) => prevState + 1);
          }}
        />)}
    </>
  )
}

const localStyles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: '#5D568D',
    maxWidth: '100%',
    lineHeight: 18,
    marginVertical: 2,
    fontFamily: FONTS.POPPINS_REGULAR,
    marginHorizontal: 4,
  }
})
