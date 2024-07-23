import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Alert, Platform } from 'react-native';
import { styles } from './ModalStyles';
import Modal from 'react-native-modal';
// import { Icon } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { ContactCard } from '../../cards/contact/ContactCard';
import { ChatScreen } from '../../../screens/message/chat/ChatScreen';
import { useSelector, useDispatch } from 'react-redux';
import { contactService } from '../../../services/contactService';
import { setContactList, setRefreshNumber, setSelectedUser } from '../../../store/userSlice';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';


export const MessageModal = (props) => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [propedUser, setPropedUser] = useState({});

  const dispatch = useDispatch();
  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const contacts = useSelector(({ user }) => user.contactList);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const result = await contactService.getContactList(token);
      setFilteredSuggestions(result);
      setSuggestions(result);
      dispatch(setContactList(result));
    } catch (error) {
      // Instruction on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchContacts();
    })();
  }, []);


  const handleContactSearch = (text) => {
    const exp = new RegExp(text, "i");
    const tempArray = [...suggestions];
    const filteredArray = tempArray.filter((item) => {
      const { user: { nom }, prenom } = item;
      if (exp.test(`${prenom} ${nom}`)) {
        return item;
      }
    });
    setFilteredSuggestions(filteredArray);
  }
  return (
    <>
      <Modal
        isVisible={props.isVisible}
        backdropOpacity={1}
        backdropColor='#fff'
      >

        <View style={styles.modalContainer}>
          {Platform.OS === 'ios' && <View style={{
            height: 40,
          }} />}
          <View style={styles.modalHeaderContainer}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon
                name="close"
                size={30}
                color={COLORS.MAIN_BLUE}
                onPress={() => {
                  setSelectedContact(null)
                  props.closeModal();
                }}
              />
              <Text style={{
                color: COLORS.MAIN_BLUE,
                fontSize: 16,
                paddingHorizontal: 10,
                fontWeight: '500', 
                fontFamily: 'Poppins-Regular',
              }}>Nouveau message</Text>
            </View>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,              
            }}>
              <Text style={{
                color: COLORS.MAIN_BLUE,
                fontSize: TEXT_SIZES.PARAGRAPH,
                paddingRight: 10,
                fontWeight: '500', 
                fontFamily: 'Poppins-Regular',
              }}>{('à:').toUpperCase()}</Text>
              {selectedContact === null ? (
                <TextInput
                  value={inputText}
                  placeholder='Entrez votre contact'
                  placeholderTextColor={COLORS.MAIN_BLUE}
                  style={{ 
                    fontSize: TEXT_SIZES.PARAGRAPH, 
                    color: COLORS.MAIN_BLUE, 
                    fontFamily: FONTS.POPPINS_REGULAR, 
                    width: '100%'
                  }}
                  onChangeText={(text) => {
                    setInputText(text);
                    handleContactSearch(text);
                  }}
                />
              ) : (
                <View style={{...styles.selectedContactContainer}}>
                  <Text style={styles.selectedContactText}>{selectedContact.firstname} {selectedContact.name}</Text>
                  <Icon
                    name="close"
                    size={26}
                    color="#fff"
                    style={{ marginLeft: 10 }}
                    onPress={() => setSelectedContact(null)}
                  />
                </View>)}
            </View>
          </View>
          {selectedContact === null ? (<ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
              flex: 1,
              marginVertical: 10,
              marginHorizontal: 20             
            }}>
              <Text style={{
                fontSize: TEXT_SIZES.PARAGRAPH,
                color: COLORS.MAIN_BLUE,
                marginBottom: 10, 
                fontFamily: FONTS.POPPINS_REGULAR,
              }}>{filteredSuggestions.length} suggestions</Text>
              {
                filteredSuggestions.map((item, index) => (
                  <ContactCard
                    firstname={item.prenom}
                    name={item.user.nom}
                    photo={item.photo}
                    role={item.fonction}
                    profil={''}
                    organization={item.organisation.nom}
                    organizationPhoto={item.organisation.logo || ''}
                    mainButtonLabel={'Message'}
                    secondButtonLabel={'Refuser'}
                    mainButtonIcon={'send'}
                    secondButtonIcon={'delete'}
                    withCardAction={false}
                    from_structure={item.from_structure}
                    organizationEntity={item.organisation}
                    raison_sociale= {item.raison_sociale}
                    handleClick={() => {                      
                      const user = {
                        photo: item.photo,
                        name: item.user.nom,
                        firstname: item.prenom,
                        organization: item.organisation.nom,
                        role: item.fonction,
                        chatId: item.conversation.id,
                        chatName: item.conversation.room,                
                      }
                      dispatch(setSelectedUser(user));
                      setSelectedContact({...user, userId:item.user.id});
                    }}
                    key={index}
                  />
                ))
              }
            </View>
          </ScrollView>) : (

            <>
             <View style={{margin: 10}}></View>
             <ChatScreen
              noHeader={true}
              noBackAction={true}
              noAppointment={true}
              noBack={true}
              user={{ ...selectedContact, userId: selectedContact.userId }}
            />
            </>
          )
          }
        </View>
      </Modal>
    </>
  )
}