import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, StackActions } from "@react-navigation/native";
import jwt_decode from 'jwt-decode';

import { MessageElement } from '../../components/message/element/MessageElement';
import { MessageModal } from '../../components/modals/message/MessageModal';
import { messageService } from '../../services/messageService';
import { styles } from './styles';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { setSelectedUser, setRendezVous } from '../../store/userSlice';
import { MainHeader } from '../../components/header/main/MainHeader';
import { SearchInput } from '../../components/inputs/search/SearchInput';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS } from '../../constants/theme';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import apiUrls from '../../../apiUrls';
import { EmptyListComponent } from '../../components/empty/EmptyList';

const MessageScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {refreshNumber} = useSelector((state) => state.user );
  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const { participant_id } = jwt_decode(token);

  const onChangeSearch = (search) => {
    const exp = new RegExp(search, "i");
    const tempArray = [...contacts];
    const filteredArray = tempArray.filter((contact) => {
      const { contact: { name } } = contact;
      if (exp.test(name)) return contact;
    });
    setFilteredContacts(filteredArray);
  };

  const fetchMessages = () => {
    messageService.getConversationList(token)
      .then((result) => {
        const filteredArr = result.filter((item) => {
          if (item.lastMessage) {
            return item;
          }
        });
        setContacts(filteredArr);
        setFilteredContacts(filteredArr);
        setResponseResult(filteredArr);
        setIsLoading(false)
      })
      .catch((error) => {
        setResponseError(error);
      })
  }

  useEffect(() => {
    setIsLoading(true);
    fetchMessages();

    // Initialize the socket

    const ws = new WebSocket(`${apiUrls.baseSocketUrl}/liste/${participant_id}/?token=${token}`);
    ws.onopen = (e) => {
      // Connexion opened
    }
    ws.onclose = (e) => {
      // connexion closed
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setFilteredContacts((prevState) => {
        const arr = [...prevState].filter(({ contact: { id } }) => id !== data.contact.id);
        return [data, ...arr];
      })
    }
  }, [refreshNumber]);

  return (
    <>
      <MainHeader
        withTitle={true}
        title='Mes messages'
        logoSize={100}
        bottomRightRadius={80}
        withImage={true}
        noBackAction={true}
      />
      <View style={{ backgroundColor: COLORS.WHITE, paddingHorizontal: 20, paddingTop: 10 }}>
        <BackNavigation
          title={'Tableau de bord'}
          goBack={() => navigation.goBack()}
          paddingVertical={10}
        />
      </View>
      {!responseResult && <MaiLoaderComponent />}     
      {responseResult && <View style={{
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 5
      }}>
        <SearchInput
          placeholder={'Rechercher'}
          inputHeight={40}
          onChangeSearch={(val) => onChangeSearch(val)}
        />
        <Icon
          name="create-outline"
          type="ionicon"
          size={30}
          color="#281D67"
          onPress={() => setIsModalVisible(true)}
        />
      </View>}
      {responseResult && <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        {filteredContacts.length > 0 ? <View style={styles.container} >
          {
            filteredContacts.map((element, index) => {
              const participantId = element.lastMessage && element.lastMessage.du_participant ? element.lastMessage.du_participant.id : ''
              return (
                <MessageElement
                  element={{
                    user: {
                      name: element.contact.name,
                      firstname: '',
                      role: element.contact.fonction,
                      organization: element.contact.organisation,
                      organizationPhoto: element.contact.photo_organisation || element.contact.logo_organisation,
                      photo: element.contact.photo,
                      chatName: element.nom_conversation,
                      chatId: element.id,
                      userId: element.contact.id,
                      from_structure: element.contact.from_structure,
                      raison_sociale: element.contact.raison_sociale,
                      organizationEntity: element.contact.organisation
                    },
                    lastMessage: {
                      message: element.lastMessage ? element.lastMessage.message : '',
                      messageDate: element.lastMessage ? element.lastMessage.created_at || element.lastMessage.createdAt : '',
                      participantId
                    }
                  }}
                  handleClick={(user) => {
                    dispatch(setRendezVous({}));
                    dispatch(setSelectedUser(user));
                    navigation.dispatch(StackActions.push('CHAT_SCREEN', { user, isInChat: true }))
                  }}
                  key={index}
                />
              )
            })
          }
        </View> : (
          <View style={{marginVertical: 40}}>
            <EmptyListComponent message={'Aucun fil de discussion !'} />
          </View>
        )}
      </ScrollView>}
      <MessageModal
        isVisible={isModalVisible}
        closeModal={() => {          
          setIsModalVisible(false);
          setTimeout(() => {
            fetchMessages();
          }, 2000);
        }}
      />
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            fetchMessages();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>

  );
}

export default MessageScreen;