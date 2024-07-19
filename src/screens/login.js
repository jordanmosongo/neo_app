import { StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { View, Dimensions, TextInput } from 'react-native';
import React, { useState, Fragment, useEffect } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import styled from 'styled-components/native';
import Video from 'react-native-video';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { AlertModal } from '../components/modals/alert/AlertModal';
import RenderHtml from 'react-native-render-html';

import { userServices } from '../services/userServices';
import { setConfigData, setUserConnected } from '../store/userSlice';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../constants/theme';
import { ManageStatusComponent } from '../components/ManageStatusComponent';
import apiUrls from '../../apiUrls';
import { Icon } from '@rneui/themed';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [pwd, setPwd] = useState();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [configLoad, setConfigLoad] = useState(false);
  const [data, setData] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [isSecuredPwd, setIsSecuredPwd] = useState(true);

  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message',
  });

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  if (user.status === 'CONNECTED') {
    navigation.dispatch(StackActions.replace('Dashboard'));
  }

  const manageAlertInfo = (visible, title, message) => {
    setAlertInfo({
      visible,
      title,
      message,
    });
  }

  const manageResponseStatus = (status) => {
    switch (status) {
      case 400 || 403 || 500:
        return manageAlertInfo(true, 'Information', 'Une erreur est survenue. Rassurez-vous de saisir correctement vos identifiants');
      case 401:
        return manageAlertInfo(true, 'Information', "Le nom d'utilisateur ou le mot de passe est incorrect.");
      case error.request:
        return manageAlertInfo(true, 'Information', 'Une erreur est survenue. Veuiller vérifier votre connexion.');
    }
  }

  const login = async () => {
    try {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (isEmpty(userEmail) || isEmpty(pwd)) {
        return manageAlertInfo(true, 'Information', 'Vous devez nécessairement renseigner votre email et votre mot de passe.')
      }
      if (!reg.test(userEmail)) {
        return manageAlertInfo(true, 'Information', 'Email incorrect')
      }
      setLoading(true);
      const { data } = await userServices.login(userEmail, pwd);
      console.log("data from login", data);
        const { access, refresh } = data;
      const { participant_id } = jwt_decode(access);

      await AsyncStorage.setItem('@USER', JSON.stringify(data));

      dispatch(
        setUserConnected({
          access,
          refresh,
          participant_id,
        }),
      );
    } catch (error) {
      console.log("error occured  on loging user in", error);
      if (error.response) {
        return manageResponseStatus(error.response.status);
      }
      return manageAlertInfo(true, 'Information', "Une erreur est survenue. Le serveur n'a pas pu traiter cette demande");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setConfigLoad(true);
      const url = `${apiUrls.pageConfigurationBase}`;
      const response = await axios.get(url);
     // console.log("response data", response.data);
      setData(response.data);
      dispatch(setConfigData(response.data));
      setConfigLoad(false);
    } catch (error) {
      console.log('config error ', error);
      setResponseError(error);
    }
  };

  useEffect(() => {
    (async() => await fetchUser())();
  }, []);

  const customHTML = {
    html: `     
      <div style="font-family:'Poppins-Bold';color:${COLORS.WHITE};line-height:30px;justify-content:center; text-align:center;font-size:20px; margin:10;">
      <p style="">
      ${data?.message_introduction}
      </p>
      </div>          
    `};

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Video
          source={{ uri: data?.fichier }}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <View style={{
          ...styles.backgroundVideo,
          backgroundColor: COLORS.MAIN_BLUE,
          opacity: 0.85
        }}></View>
        <View style={{
          padding: width >= 600 ? 100 : 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            source={require('../components/assets/LOGO-NEO.png')}
            style={{
              width: 200,
              height: 120,
            }}
          />
          <View style={{
            height: 150,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {!data ?
              <ActivityIndicator size={20} color={COLORS.WHITE} />
              :
              <RenderHtml
                contentWidth={width}
                source={customHTML}
                systemFonts={['Poppins-Bold']}
              />}
          </View>
          <View style={{
            width: '100%',
            marginVertical: 10,
          }}>
            <TextInput
              style={styles._inputStyle}
              placeholder='E-mail'
              placeholderTextColor={COLORS.MAIN_BLUE}
              onChangeText={(val) => {
                setUserEmail(val.trim());
              }}
            />
            <View style={{ position: 'relative', marginVertical: 10 }}>
              <TextInput
                style={{ ...styles._inputStyle, marginBottom: 0 }}
                placeholder='Mot de passe'
                secureTextEntry={isSecuredPwd}
                placeholderTextColor={COLORS.MAIN_BLUE}
                onChangeText={(val) => {
                  setPwd(val);
                }}
              />
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0
                }}
                onPress={() => setIsSecuredPwd((prevState) => !prevState)}
              >
                <Icon
                  name={isSecuredPwd ? 'eye-off' : 'eye'}
                  type='feather'
                  size={24}
                  color={COLORS.MAIN_BLUE}
                  style={{
                    marginHorizontal: 15
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ButtonWrapper>          
              <StyledButton onPress={() => {
                if(!data) {
                  return null;
                }
                login()
              }}>
                {loading ? (
                  <ActivityIndicator size={15} color="#fff" />
                ) : (
                  <Text style={styles.txt_btn}>Je me connecte</Text>
                )}
              </StyledButton>           
          </ButtonWrapper>
          <TouchableOpacity  onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.forgotPwd}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
          <View style={{
            marginVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            <Text style={{ ...styles.forgotPwd, textDecorationLine: 'none', }}>{'\u00A9'}2023 Agence Bec</Text>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 4
            }}>
              <TouchableOpacity onPress={() => navigation.navigate('MentionsLegales')}>
                <Text style={styles.forgotPwd}>Mentions légales</Text>
              </TouchableOpacity>
              <Text style={{ color: COLORS.WHITE, marginHorizontal: 5 }}>-</Text>
              <TouchableOpacity  onPress={() => navigation.navigate('copyrights')}>
                <Text style={styles.forgotPwd}>Conditions d'utilisation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo(prevState => ({ ...prevState, visible: false }));
        }}
      />
      {((responseError?.request || responseError?.response) && !data) && <ManageStatusComponent
        error={responseError}
        nbreOfRepetitions={nbreOfRepetitions}
        isStatusError={true}
        handleActionOnError={async () => {
          await fetchUser();
          setNbreOfRepetitions((prevState) => prevState + 1);
        }}
      />}
    </>
  );
};
const styles = StyleSheet.create({
  _inputStyle: {
    marginBottom: 10,
    borderRadius: 50,
    paddingLeft: 10,
    paddingTop: Platform.OS === 'android' ? 10 : 15,
    paddingBottom: Platform.OS === 'android' ? 10 : 15,
    fontFamily: FONTS.POPPINS_REGULAR,
    backgroundColor: COLORS.WHITE,
    textAlign: 'center',
    fontSize: TEXT_SIZES.PARAGRAPH,
    color: COLORS.MAIN_BLUE,
    justifyContent: 'center',
    paddingVertical: width >= 600 ? 17 : 10
  },
  txt_btn: {
    textAlign: 'center',
    letterSpacing: 1,
    color: '#fff',
    fontSize: TEXT_SIZES.PARAGRAPH,
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  backgroundVideo: {
    height: height,
    width: width,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: width >= 600 ? 360 : 180,
  },
  forgotPwd: {
    textDecorationLine: 'underline',
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: FONTS.POPPINS_REGULAR
  },
});

export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 65%;
`;

const StyledButton = styled.TouchableHighlight`
  width:100%;
  background-color:${props => (props.transparent ? 'red' : 'red')};
  padding:10px;
  border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
  justify-content:center;
  margin-bottom:20px;
  border-radius:24px
`;
export default Login;
