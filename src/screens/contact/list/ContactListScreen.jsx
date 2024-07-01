import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Pressable, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { ContactCard } from '../../../components/cards/contact/ContactCard';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { contactService } from '../../../services/contactService';
import { setContactList, setSelectedParticiapantId, setSelectedUser } from '../../../store/userSlice';
import { MaiLoaderComponent } from '../../../components/loaders/MainLoader';
import { EmptyListComponent } from '../../../components/empty/EmptyList';
import { SearchInput } from '../../../components/inputs/search/SearchInput';
import { MainHeader } from '../../../components/header/main/MainHeader';
import { COLORS, FONTS } from '../../../constants/theme';
import { BackNavigation } from '../../../components/buttons/back/BackNavigation';
import { ManageStatusComponent } from '../../../components/ManageStatusComponent';

export const ContactListScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {width} = Dimensions.get('window');

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const {refreshNumber} = useSelector((state) => state.user);
  const data = useSelector(({ user }) => user.contactList);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      setResponseResult(null);
      const result = await contactService.getContactList(token);
      dispatch(setContactList(result));
      setContacts(result);
      setFilteredContacts(result);
      setResponseResult(result);
      setIsLoading(false);
    } catch (error) {
      setResponseError(error);
    } 
  };

  const onChangeSearch = (search) => {
    const exp = new RegExp(search, "i");
    const tempArray = [...contacts];
    const filteredArray = tempArray.filter((item) => {
      const { user: { nom }, prenom } = item;
      if (exp.test(`${prenom} ${nom}`)) {
        return item;
      }
    });
    setFilteredContacts(filteredArray);
  };

  useEffect(() => {
    (async () => {
      await fetchContacts();
    })();
  }, [refreshNumber]);
  return (
    <>
      <MainHeader
        withTitle={true}
        title='Mes contacts'
        withNumber={true}
        number={data.length}
        logoSize={100}
        noBackAction={true}
      />
      <View style={{
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 20
      }}>
        <BackNavigation
          title={'Tableau de bord'}
          paddingVertical={20}
          goBack={() => navigation.goBack()}
        />
      </View>
      {isLoading && <MaiLoaderComponent />}     
      {(!isLoading) && <View style={{
        paddingHorizontal: 20,
        paddingTop: 0,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff'
      }}>
        <SearchInput
          placeholder={'Rechercher'}
          inputHeight={40}
          inputWidth={ width >= 600 ? '85%' :'75%'}
          onChangeSearch={(val) => onChangeSearch(val)}
        />
        <View>
          <Pressable
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('INVITATIONS')}>
            <Text style={{ 
              fontSize: 12, 
              color: COLORS.MAIN_BLUE,
              fontFamily: FONTS.POPPINS_REGULAR
              }}>Invitations</Text>
            <Icon
              name='arrow-right'
              size={24}
              color={COLORS.MAIN_BLUE}
            />
          </Pressable>
        </View>
      </View>}
      {(!isLoading && data.length === 0) && <EmptyListComponent message={'La liste des contacts est vide !'} />}
      {(!isLoading && data.length > 0) && <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{
          flex: 1,
          marginBottom: 10,
          marginHorizontal: 20
        }}>
          {
            filteredContacts.map((item, index) => (
              <ContactCard
                firstname={item.prenom}
                name={item.user.nom}
                photo={item.photo}
                role={item.fonction}
                profil={'Intervenant'}
                organization={item.organisation.nom}
                organizationPhoto={item.organisation.logo || ''}
                organizationEntity={item.organisation}
                from_structure= {item.from_structure}
                raison_sociale= {item.raison_sociale}
                mainButtonLabel={'Message'}
                secondButtonLabel={'Refuser'}
                mainButtonIcon={''}
                secondButtonIcon={''}
                withCardAction={true}
                redirect={true}
                handleRedirection={() => {
                  console.log('user id', item.user.id);
                  navigation.navigate('DetailParticipant', {
                    isNotParticipant: true
                  });
                  dispatch(setSelectedParticiapantId(item.user.id));
                }}
                handleButtonClick={() => {
                  const user = {
                    photo: item.photo,
                    name: item.user.nom,
                    firstname: item.prenom,
                    organization: item.organisation.nom,
                    organizationPhoto: item.organisation.logo || '',
                    role: item.fonction,
                    chatId: item.conversation.id,
                    chatName: item.conversation.room,
                    from_structure: item.from_structure,
                    raison_sociale: item.raison_sociale,
                    userId: item.user.id
                  }
                  dispatch(setSelectedUser(user));
                  navigation.dispatch(StackActions.push('CHAT_SCREEN', { user }));
                }}
                key={index}
              />
            ))
          }
        </View>
      </ScrollView>}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchContacts();             
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
      />)}
    </>
  )
}