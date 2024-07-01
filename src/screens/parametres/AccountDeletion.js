import axios from 'axios';
import React ,{useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import apiUrls from '../../../apiUrls';
import MainButton from '../../components/buttons/main/MainButton';
import { MainHeader } from '../../components/header/main/MainHeader';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserLogout } from '../../store/userSlice';

export const AccountDeletionScreen = () => {
    const [loading, setLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
        visible: false,
        title: 'Titre',
        message: 'message'
      });

    const {tokens, infos} = useSelector((state) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleAccountDeletion = async() => {
      try {
        setLoading(true)
        const {data} = await axios.post(`${apiUrls.baseUrl}/api/closeaccount`, {mail: infos?.user?.email}, {
         headers: { Authorization : `JWT ${tokens.access}`}
        });
        setAlertInfo({
          visible: true,
          title: 'Information',
          message: "Demande de suppression envoyée. Veuillez vérifier votre mail."
        })
      } catch (error) {
        console.log('error on delete account', error);
      } finally {
        setLoading(false);
      }
    } 

    return (
      <>
       <MainHeader
         withTitle={true}
         title="Demande de suppression du compte"
         noBackAction={true}
       />
       <View style={{ 
        paddingHorizontal: 20, 
        marginBottom: 0,
        backgroundColor: COLORS.WHITE
        }}>
         <BackNavigation
           goBack={() => navigation.goBack()}
           paddingVertical={20}
         />
       </View>

       <ScrollView style={{
        flex: 1,
        backgroundColor: COLORS.WHITE,
        padding: 20
       }}>
       <View style={{
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: COLORS.WHITE,
        ...BORDERS_WITH_SHADOWS.PROGRAM_CARD
       }}>
          <TextInput
            style={styles._inputStyle}
            value={infos.user.email}
            editable={false}
          />
          <MainButton
           label={'Envoyer'}
           icon={''}
           verticalMargin={8}
           loading={loading}
           radius={50}
           padding={0}
           marginRight={0}
           withBorder={true}
           color="#271d67"
           txtColor="#fff"
           handleClick={async () => await handleAccountDeletion()}
          />
       </View>
       </ScrollView>
       <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={async() => {
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
          await AsyncStorage.clear();
          dispatch(setUserLogout());
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
          })
        }}
       />
      </>
    )
}

const styles = StyleSheet.create({
    _inputStyle: {
      marginBottom: 10,
      borderRadius: 50,
      borderColor: COLORS.MAIN_BLUE,
      borderWidth: 1,
      width: '100%',
      paddingLeft: 10,
      paddingTop: Platform.OS === 'android' ? 10 : 15,
      paddingBottom: Platform.OS === 'android' ? 10 : 15,
      fontFamily: FONTS.POPPINS_REGULAR,
      backgroundColor: COLORS.WHITE,
      textAlign: 'center',
      fontSize: TEXT_SIZES.PARAGRAPH,
      color: COLORS.MAIN_BLUE,
      justifyContent: 'center',
      paddingVertical: 14,      
    },   
  });