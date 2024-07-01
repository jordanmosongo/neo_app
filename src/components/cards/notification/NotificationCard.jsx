import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Avatar, Card, Button} from 'react-native-paper';
import {styles} from './NotificationStyle';
import moment from 'moment/moment';
import 'moment/locale/fr';
import {useSelector, useDispatch} from 'react-redux';
import {setNbreOfNotifications, setRefreshHeaderNotifNumber, setSelectedUser} from '../../../store/userSlice';
import {useNavigation, StackActions} from '@react-navigation/native';
import {userServices} from '../../../services/userServices';
import { ConfirmationModal } from '../../modals/confirmation/ConfirmationModal';
import apiUrls from '../../../../apiUrls';
import axios from 'axios';
import { COLORS, FONTS } from '../../../constants/theme';
import { ManageStatusComponent } from '../../ManageStatusComponent';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';

export const NotificationCard = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [acceptConfirmation, setAcceptConfirmation] = useState(false);
  const [isDenyingInProgress, setIsDenyingInProgress] = useState(false);
  const [isAcceptingInProgress, setIsAcceptingInProgress] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {tokens, nbreOfNotifications} = useSelector(state => state.user);

  const updateNotificationState = async() => {
    try {
      setResponseResult(null);
      const result = await userServices.updatStatNotification(
        {etat: true},
        tokens.access,
        props.idNotification,
      );  
      setResponseResult(result);
      dispatch(setRefreshHeaderNotifNumber());
      // dispatch(setNbreOfNotifications(nbreOfNotifications - 1));
    } catch (error) {
      console.log('error on updating notification', error);
      // setResponseError(error);
    }
  }

  const gotToChatScreen = async () => {
    try {
      setResponseResult(null);
      setIsUpdating(true);
      const {data} = await userServices.updatStatNotification(
        {etat: true},
        tokens.access,
        props.idNotification,
      );
      setResponseResult(data);

      const user = {
        photo: props.emitor.photo,
        name: props.emitor.nom,
        firstname: props.emitor.prenom,
        organization: props.emitor.organisation.nom,
        organizationPhoto: props.emitor.organisation.logo,
        role: props.emitor.fonction,
        chatId: props.conversationId,
        chatName: props.room,
        userId: props.emitor.id
      };
      
      dispatch(setSelectedUser(user));
      navigation.dispatch(StackActions.push('CHAT_SCREEN', {user}));
    } catch (error) {
      console.log('error on pdating notif to move to chat', error);
      // setResponseError(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const computeMomentText = (created_at) => {
    const text = moment(created_at).fromNow();

    if (text.search('quelques') > 0) {
      return 'maintenant';
    }    
    return text;
  }

  const denyContactInvitation = async () => {
    if(!props.targetId || props.targetId === '') {
      await updateNotificationState();
      return null
    }
    try {
      setIsDenyingInProgress(true);
      setResponseResult(null);
      await axios.put(`${apiUrls.contacts}`, {
        operation: 'refuser',
        demande_id: props.targetId
      }, {headers: {Authorization: `JWT ${tokens.access}`}});

      await userServices.updatStatNotification(
        {etat: true},
        tokens.access,
        props.idNotification,
      );
      setResponseResult('succeed');  
      dispatch(setRefreshHeaderNotifNumber());
     // dispatch(setNbreOfNotifications(nbreOfNotifications - 1));
      
    } catch (error) {
      if (error.response.status) {
        await updateNotificationState();
      }
      setResponseError(error);
    } finally {
      setIsDenyingInProgress(false);
      setDeleteConfirmation(false);
    }
  }

  const acceptContactInvitation = async () => {
    if(!props.targetId || props.targetId === '') {
      await updateNotificationState('');
      return null
    }
    try {
      setIsAcceptingInProgress(true);
      setResponseResult(null);
      await axios.put(`${apiUrls.contacts}`, {
        operation: 'accepter',
        demande_id: props.targetId
      }, {headers: {Authorization: `JWT ${tokens.access}`}});

      await userServices.updatStatNotification(
        {etat: true},
        tokens.access,
        props.idNotification,
      );  
      setResponseResult('success');
      dispatch(setRefreshHeaderNotifNumber());
      // dispatch(setNbreOfNotifications(nbreOfNotifications - 1));
    } catch (error) {
      if (error.response.status) {
        await updateNotificationState();
      }
      console.log('error on updating notification', error);
      // setResponseError(error);
    } finally {
      setIsAcceptingInProgress(false);      
      setAcceptConfirmation(false);
    }
  }

  return (
    <>
      <Card
        mode="contained"
        onPress={async() => {
          if (props.type === 'DEMANDE_RENDEZ_VOUS') {
            if (!props.dataTarget) {
              await updateNotificationState();
              return null;
            }
            navigation.navigate('RENDEZ_VOUS', {
              emitor: props.emitor,
              notificationId: props.idNotification,
              dataTarget: props.dataTarget
            })
          }
        }}
        style={{
          borderRadius: 0,
          backgroundColor: 'transparent',
        }}>
        <View style={styles.container}>
          <View style={styles.elementContainer}>
            <Avatar.Image size={50} source={{uri: `${props.emitor.photo}`}} />
            <View
              style={{
                width: '95%',
              }}>
              <View style={{marginLeft: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{...styles.elementTitle, width: '70%'}}>
                    {capitalizeStrOnFirstLetter(props.emitor.prenom)} {capitalizeStrOnFirstLetter(props.emitor.nom)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 8,
                      color: COLORS.MAIN_BLUE,
                      width: '30%',
                      marginRight: 100,
                      fontFamily: FONTS.POPPINS_REGULAR
                  }}>
                    {capitalizeStrOnFirstLetter(computeMomentText(props.created_at))}
                  </Text>
                </View>
                <Text
                  style={{
                    ...styles.text,
                    maxWidth: '95%',
                  }}>
                  {props.detail}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 10,
                }}>           
                {(props.type === 'INVITATION_ACCEPTEE' ||
                  props.type === 'MESSAGE') && (
                  <Button
                    style={{
                      backgroundColor: '#F2F2F2',
                      marginLeft: 10,
                    }}
                    icon={''}
                    mode="text"
                    labelStyle={{
                      fontFamily: FONTS.POPPINS_REGULAR
                    }}
                    loading={isUpdating}
                    onPress={async () => await gotToChatScreen()}>
                    {isUpdating ? 'patientez...' : 'Message'}
                  </Button>
                )}

                {props.type === 'INVITATION' && (
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {!isAcceptingInProgress && <Button
                      style={{
                        backgroundColor: '#F2F2F2',
                        marginLeft: 10,
                      }}
                      icon={''}
                      labelStyle={{
                        fontFamily: FONTS.POPPINS_REGULAR
                      }}
                      mode="text"
                      onPress={() => setDeleteConfirmation(true) }
                     >
                      refuser
                    </Button>}
                     <Button
                      style={{
                        backgroundColor: '#F2F2F2',
                        marginLeft: 10,
                      }}
                      icon={''}
                      mode="text"
                      labelStyle={{
                        fontFamily: FONTS.POPPINS_REGULAR
                      }}
                      loading={isAcceptingInProgress}
                      onPress={() => setAcceptConfirmation(true)}
                      >
                      accepter
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Card>
      <ConfirmationModal
       confirmMessage={`Etes-vous sûr(e) de refuser cette invitation ?`}
       isVisible={deleteConfirmation}
       loading={isDenyingInProgress}
       handleDeny={() => setDeleteConfirmation(false)}
       handleConsent={async () => await denyContactInvitation()}
      />
      <ConfirmationModal
        confirmMessage={`Etes-vous sûr(e) de réjoindre ce réseau ?`}
        isVisible={acceptConfirmation}
        loading={isAcceptingInProgress}
        handleDeny={() => setAcceptConfirmation(false)}
        handleConsent={async () => await acceptContactInvitation()}
      />
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            setResponseError(null);
          }}
        />)}
    </>
  );
};
