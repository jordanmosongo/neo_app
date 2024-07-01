import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight, ActivityIndicator, Dimensions
} from 'react-native';
import { TextInput } from 'react-native-element-textinput';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AlertModal } from './modals/alert/AlertModal';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { DetailHeader } from './header/main/DetailHeader';
import { BackNavigation } from './buttons/back/BackNavigation';
import apiUrls from '../../apiUrls';
import { ManageStatusComponent } from './ManageStatusComponent';
import { MainHeader } from './header/main/MainHeader';

const {width} = Dimensions.get('window');

export default function Forgot() {
  const [message, setMessage] = useState('');
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [emptyError, setEmptyError] = useState(false);
  const navigation = useNavigation();
  const [saveLoading, setSaveLoading] = useState(false);

  const { tokens } = useSelector(state => state.user);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const resetText = () => {
    setMessage('');
  };
  const HandleMessagetoContact = async () => {
    try {
      if (message === '') {
         setEmptyError(true);
         setTimeout(() => {
          setEmptyError(false);

         }, 3000);
        return null
      };      
      setSaveLoading(true);
      const {data} = await axios.post(apiUrls.resetPassword, { email: message }
        // { headers: {  Authorization: `JWT ${tokens.access}` }}
      );
      setResponseResult(data);
      setAlertInfo({
        visible: true,
        title: 'Information',
        message: "Votre mot de passe a été envoyé à l'adresse email indiquée."
      })
      resetText();
      setSaveLoading(false);
    } catch (error) {
      setResponseError(error);
    }
  };

  return (
    <>
      <MainHeader
       withTitle={true} 
       title={'Récupération du mot de passe'}
       noBackAction={true}
       noClickOnLogo={true}
       hideNotifIcon={true}
      />
      <View style={{backgroundColor: COLORS.WHITE, paddingHorizontal: 20}}>
        <BackNavigation 
          title={'Reinitialiser le mot de passe'} 
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      <View style={styles.panel}>
        <View style={{
          width: '100%',
          marginBottom: 20,
          marginTop: 10
        }}>
          <Text style={{
            color: COLORS.MAIN_BLUE,
            fontSize: SIZES.font,
            fontFamily: FONTS.POPPINS_REGULAR
          }}>Votre Adresse e-mail</Text>
        </View>
        <TextInput
          value={message}
          keyboardType="email-address"
          style={styles.textInput}
          inputStyle={styles.labelStyle}
          placeholderStyle={styles.placeholderStyle}
          showIcon={false}
          //returnKeyType="next"
          placeholder="Saisissez votre adresse email"
          placeholderTextColor={COLORS.MAIN_BLUE}
          onChangeText={text => {
            setMessage(text);
          }} />
         {emptyError && <Text style={{
           color: COLORS.MAIN_RED, 
           fontFamily: FONTS.POPPINS_REGULAR,
           fontSize: SIZES.font,
           marginTop: 10
          }}>Veuillez renseigner ce champ</Text>}
        <TouchableHighlight style={styles.button} disabled={saveLoading} onPress={HandleMessagetoContact}>

          {saveLoading ? (
            <ActivityIndicator size={15} color="#fff" />
          ) : (
            <Text style={styles.txt_btn}>Envoyer</Text>
          )}
        </TouchableHighlight>
      </View>
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
        }}
      />
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            resetText();
            setSaveLoading(false);
            setResponseError(null);
          }}
      />)}
    </>
  );
}
const styles = StyleSheet.create({
  panel: {
    flex: 1,
    paddingHorizontal: width >= 600 ? 100 : 20,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  txt_btn: {
    textAlign: 'center',
    letterSpacing: 1,    
    fontWeight: 'bold',
    color: '#fff', 
    fontSize: 16, 
    fontFamily: 'Poppins-Regular',
  },
  button: {
    width: '65%',
    backgroundColor: COLORS.MAIN_BLUE,
    padding: 10,
    border: 0,
    borderRadius: 24, 
    marginTop: 20
  }, 
  textInput: {
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: COLORS.MAIN_BLUE,
    textAlign: 'center',
  },
  placeholderStyle: {
    fontWeight: 'bold',
    color: COLORS.MAIN_BLUE, 
    fontFamily: 'Poppins-Regular',
  },
  labelStyle: {
    textAlign: 'center',
    fontSize: 14,
    color: COLORS.MAIN_BLUE,
    fontFamily: 'Poppins-Regular',
  },
});



