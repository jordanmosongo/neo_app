import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import Textarea from 'react-native-textarea';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import MainButton from '../../components/buttons/main/MainButton';
import { DetailHeader } from '../../components/header/main/DetailHeader';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../../constants/theme';
import apiUrls from '../../../apiUrls';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { MainHeader } from '../../components/header/main/MainHeader';

const Contact = () => {
  const navigation = useNavigation();

  const [message, setMessage] = useState('');
  const [objet, setObjet] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const resetText = () => {
    setMessage('');
    setObjet('');
  };

  const { tokens } = useSelector(state => state.user);

  const HandleMessagetoContact = async () => {
    const url = apiUrls.contactBase;
    try {
      setResponseResult(null);
      if (message === '' && objet === '') {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
        return null;
      }
      setSaveLoading(true);
      const { data } = await axios.post(url, { message, objet }, { headers: { Authorization: `JWT ${tokens.access}` } });
      setResponseResult(data);
      setAlertInfo({
        visible: true,
        title: 'Information',
        message: "Nous vous remercions de nous contacter. Notre équipe revient vers vous dans les plus brefs délais."
      })
      resetText();
      setSaveLoading(false);
    } catch (error) {
      console.log('error from contact new', error);
      setResponseError(error);
      setSaveLoading(false);
    }    
  };

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Nous contacter"
        noBackAction={true}
       />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ marginHorizontal: 20, marginBottom: 0 }}>
          <BackNavigation 
            title={'Nous contacter'} 
            goBack={() => navigation.goBack()}
            paddingVertical={20}
           />
        </View>
        <View style={{ margin: 20, gap: 10, marginTop: 0 }}>
          <Text style={styles.texte}>
            Pour toute demande relative à votre compte sur l'application NEO,
            n'hésitez pas à nous contacter via le formulaire de contact.
            Nous reviendrons vers vous dans le plus bref délais.
            L'équipe de l'Agence BEC.
          </Text>

          <View style={{ borderTopColor: '#00a7d5', borderTopWidth: 1, marginTop: 20 }}></View>

          <Text style={styles.text}>Objet</Text>
          <Textarea
            containerStyle={{...styles.textareaContainere}}
            style={{
              ...styles.textarea, 
              paddingTop: 5
            }}
            onChangeText={value => setObjet(value)}
            defaultValue={objet}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'transparent'}
          />
          <View style={{ borderTopColor: '#00a7d5', borderTopWidth: 1, marginTop: 20 }}></View>
          <Text style={styles.text}>Message</Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={value => setMessage(value)}
            defaultValue={message}
            maxLength={400}
            placeholderTextColor={'#fff'}
            underlineColorAndroid={'transparent'}
          />
        </View>
        <View style={{ marginHorizontal: 30, marginTop: -20 }}>
          {error && (
            <Text style={{ color: COLORS.RED, fontSize: SIZES.font, fontFamily: FONTS.POPPINS_REGULAR }}>
              Une erreur est survenue lors de la sauvegarde, veuillez
              ressayer
            </Text>
          )}
          {submitSuccess && (
            <Text
              style={{ color: 'green', fontSize: 12, fontFamily: 'Poppins-Regular', }}>
              Nous vous remercions de nous contacter. Notre équipe revient vers vous dans les plus brefs délais.
            </Text>
          )}

          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginVertical: 10,
            marginRight: -10
          }}>
            <MainButton
              label={'Envoyer'}
              icon={''}
              verticalMargin={8}
              loading={saveLoading}
              radius={50}
              padding={0}
              marginRight={0}
              withBorder={true}
              color="#271d67"
              txtColor="#fff"
              handleClick={async () => await HandleMessagetoContact()}
            />
          </View>
        </View>
      </ScrollView>
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
            setResponseError(null);
          }}
        />)}
    </>
  );
};

export default Contact;

const styles = StyleSheet.create({
  txt_btn: {
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: '#281D67',
  },
  texte: {
    color: COLORS.MAIN_BLUE,
    fontSize: SIZES.font,
    lineHeight: 20,
    fontFamily: FONTS.POPPINS_REGULAR
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    backgroundColor: '#d2e9fb',
    borderWidth: 1,
    borderColor: '#d2e9fb',
    // borderRadius: 10,
    fontFamily: 'Poppins-Regular',
  },
  textareaContainere: {
    height: 48,
    padding: 5,
    backgroundColor: '#d2e9fb',
    borderWidth: 1,
    borderColor: '#d2e9fb',
    // borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: TEXT_SIZES.PARAGRAPH,
    color: COLORS.MAIN_BLUE,
    fontFamily: 'Poppins-Regular',
  },
});

