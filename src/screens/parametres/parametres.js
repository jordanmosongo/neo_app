import React, {useState} from 'react';
import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Switch,
  Text,
  View,
  Linking,
} from 'react-native';
import {Icon} from '@rneui/themed';
import {color, Dialog} from '@rneui/base';
import {Helpers} from '../../helpers/helpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setUserLogout} from '../../store/userSlice';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settingmenue = props => {
  const navigation = useNavigation();
  const {
    titre,
    subtitle,
    children,
    image,
    icone,
    option1,
    option2,
    option3,
    phone1,
    phone2,
    email,
    liens,
  } = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleOpen}
        // style={styles.heading}
        activeOpacity={0.6}>
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#ffffff',
            marginBottom: 5,
            padding: 5,
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={icone} type="ionicon" size={30} color="black" />
            <Text
              style={{
                color: 'black',
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
              }}>
              {titre}
            </Text>
          </View>
          <View style={{}}>
            <Icon
              color="#000"
              name={isOpen ? 'chevron-down' : 'chevron-right'}
              size={15}
              type="font-awesome"
            />
          </View>
        </View>
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{}}>
            {option1 !== '' && (
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate('Profil');
                }}>
                <Text style={{color: '#124ef6', fontFamily: 'Poppins-Bold'}}>
                  {option1}
                </Text>
              </TouchableOpacity>
            )}
            <View style={{}}>
              {phone1 !== '' && (
                <Text style={{color: '#000', fontFamily: ''}}>{phone1}</Text>
              )}
              {phone2 !== '' && (
                <Text style={{color: '#000', fontFamily: ''}}>{phone2}</Text>
              )}
              {email !== '' && (
                <Text style={{color: '#000', fontFamily: ''}}>{email}</Text>
              )}
              {liens !== '' && (
                <Text style={{color: '#000', fontFamily: ''}}>{liens}</Text>
              )}
            </View>
          </View>
         </View>
      </View>
    </View>
  );
};

const SettingsScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const {infos} = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const toggleDialog2 = () => {
    setVisible(!visible);
  };

  const items = [
    {
      id: 0,
      titre: 'Mon profiles',
      icone: 'person-outline',
      option1: 'Voire le profile',
      option3: '',
      phone1: '',
      phone2: '',
      email: '',
      liens: '',
    },
    {
      id: 1,
      titre: 'Contactez-nous',
      icone: 'call',
      option1: '',
      phone1: '+243 8538110000',
      phone2: '+243 8538117888',
      email: 'BEC@Gmail.com',
      liens: '',
    },
    {
      id: 2,
      titre: 'Conditions Légales',
      icone: 'warning-outline',
      subtitle: 'descriptiom',
      phone1: '',
      phone2: '',
      email: '',
      liens: '',
    },
    {
      id: 3,
      titre: 'Agence BEC-copyright',
      icone: 'help-circle-outline',
      subtitle: 'descriptiom',
      phone1: '',
      phone2: '',
      email: '',
      liens: '',
    },
    {
      id: 4,
      titre: 'Parametres',
      icone: 'settings-outline',
      subtitle: 'descriptiom',
      phone1: '',
      phone2: '',
      email: '',
      liens: '',
    },
  ];

  return (
    <View style={{backgroundColor: '#f3f3f3', marginTop: 20}}>
      {items.map(option => {
        return (
          <Settingmenue
            id={option.id}
            icone={option.icone}
            titre={option.titre}
            subtitle={option.subtitle}
            option1={option.option1}
            phone1={option.phone1}
            phone2={option.phone2}
            email={option.email}
            liens={option.liens}
          />
        );
      })}

      <Dialog
        overlayStyle={{backgroundColor: 'white'}}
        isVisible={visible}
        onBackdropPress={toggleDialog2}>
        <Dialog.Title titleStyle={{color: '#000'}} title="Deconnexion" />
        <Text style={{color: '#000'}}>
          Êtes-vous sûr(e) de vouloir vous déconnecter ?
        </Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Oui"
            onPress={async () => {
              // clear asyncStorage
              await AsyncStorage.clear();
              dispatch(setUserLogout());
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            }}
          />
          <Dialog.Button title="Non" onPress={() => toggleDialog2()} />
        </Dialog.Actions>
      </Dialog>

      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={{
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 20}}>
            Deconnexion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
});
export default SettingsScreen;
