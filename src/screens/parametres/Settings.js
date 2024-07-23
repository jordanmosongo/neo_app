import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { Icon } from '@rneui/base';
import { useParticipant } from '../../hooks/useParticipant';
import { Helpers } from '../../helpers/helpers';
import { initializeStore, setUserLogout } from '../../store/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainHeader } from '../../components/header/main/MainHeader';
import { ConfirmationModal } from '../../components/modals/confirmation/ConfirmationModal';
import { SettingButton } from '../../components/buttons/setting/SettingButton';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { Skeleton } from '@rneui/themed';

const Settings = () => {
  useParticipant();
  const { infos } = useSelector(state => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const toggleDialog2 = () => {
    setVisible(!visible);
  };

  const checkIfInfos = () => {
    const keys = Object.keys(infos);
    return keys.length === 0;
  }

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Mon compte"
        logoSize={100}
        bottomRightRadius={80}
        noBackAction={true}
      />
      <View style={{ backgroundColor: COLORS.WHITE, paddingHorizontal: 20, paddingTop: 10 }}>
        <BackNavigation
          title={'Tableau de  bord'}
          goBack={() => navigation.goBack()}
          paddingVertical={10}
        />
      </View>
      <ScrollView style={{ padding: 20, backgroundColor: '#fff' }}>
        {checkIfInfos() ? (
          <View style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Skeleton circle animation="wave" width={80} height={80} />
            <Skeleton animation="wave" width={100} height={30} />
          </View>
          <Skeleton animation="wave" width={150} height={20} />
         </View>
        )  : 
        (<View>          
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Image
              source={{ uri: `${Helpers.getPhotoUrl(infos?.photo)}` }}
              resizeMode="cover"
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: 50,
                resizeMode: "cover"
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profil');
              }}
              style={{
                backgroundColor: COLORS.MAIN_BLUE_LIGHT,
                paddingVertical: 4,
                paddingHorizontal: 20,
                borderRadius: 50,
              }}>
              <Text style={{ color: '#fff', fontFamily: FONTS.POPPINS_REGULAR, fontSize: TEXT_SIZES.PARAGRAPH}}>
                Voir mon profil
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: '#271d67',
                fontFamily: FONTS.POPPINS_BOLD,
                marginTop: 10
              }}>
              {`${infos?.user?.prenom} ${infos?.user?.nom}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 2,
              }}
            >
              <Icon
                style={{
                  backgroundColor: '#271d67',
                  marginRight: 10,
                  borderRadius: 50,
                  padding: 2
                }}
                name="mail-outline"
                type="ionicon"
                color={'#fff'}
                size={16}
              />
              <Text
                style={{
                  color: COLORS.MAIN_BLUE,
                  fontSize: TEXT_SIZES.PARAGRAPH,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  margin: 0,
                }}>
                {infos?.coordonnes?.email}
              </Text>
            </View>
          </View>
        </View>)
        }
        <ScrollView style={{
          borderTopWidth: 1,
          borderTopColor: '#00a7d5',
          marginTop: 5
        }}>
          <SettingButton title={'Mentions légales'} onPress={() => navigation.navigate('MentionsLegales', {
            showNotif: true
          })} />
          <SettingButton title={`Conditions d'utilsation`} onPress={() => navigation.navigate('copyrights', {
            showNotif: true
          })} />
          <SettingButton title={'Nous contacter'} onPress={() => navigation.navigate('Contact')} />
          <SettingButton title={'Paramètres'} onPress={() => navigation.navigate('Reglage')} />

        </ScrollView>
        <ConfirmationModal
          confirmMessage={`Êtes-vous sûr(e) de vouloir vous déconnecter ?`}
          isVisible={visible}
          handleDeny={() => toggleDialog2()}
          handleConsent={async () => {
            await AsyncStorage.clear();
            dispatch(setUserLogout());

            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginVertical: 20,
        }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              backgroundColor: COLORS.MAIN_RED,
              paddingVertical: 4,
              paddingHorizontal: 20,
              borderRadius: 50,
            }}>
            <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', }}>
              Se déconnecter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};
export default Settings;


