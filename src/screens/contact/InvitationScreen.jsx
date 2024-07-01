import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { MainHeader } from '../../components/header/main/MainHeader';
import { ContactInvitationScreen } from './invitation/ContactInvitationScreen';
import { ContactRequestScreen } from './request/ContactRequestScreen';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

export const InvitationScreen = () => {
  const [screen, setScreen] = useState(1);
  const navigation = useNavigation();

  return (
    <>
      <MainHeader
        withTitle={true}
        title='Invitations'
        logoSize={100}
        bottomRightRadius={80}
        noBackAction={true}
      />
      <View style={{ 
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 20
        }}>
        <BackNavigation
          title={'Contacts'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 0
      }}>
        <View style={{
          backgroundColor: screen === 1 ? COLORS.MAIN_BLUE_LIGHT : '#fff',
          borderColor: COLORS.MAIN_BLUE_LIGHT,
          borderWidth: 1,
          borderRadius: 50,
          width: '48%',
          paddingVertical: 4
        }}>
          <Pressable onPress={() => setScreen(1)}>
            <Text style={{
              color: screen === 1 ? '#fff' : COLORS.MAIN_BLUE_LIGHT,
              textAlign: 'center',
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: SIZES.small
            }}>Invitations reçues</Text>
          </Pressable>
        </View>
        <View style={{
          backgroundColor: screen === 2 ? COLORS.MAIN_BLUE_LIGHT : '#fff',
          borderColor: COLORS.MAIN_BLUE_LIGHT,
          borderWidth: 1,
          borderRadius: 50,
          width: '48%',
          paddingVertical: 4,
        }}>
          <Pressable onPress={() => setScreen(2)}>
            <Text style={{
              color: screen === 2 ? '#fff' : COLORS.MAIN_BLUE_LIGHT,
              textAlign: 'center',
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: SIZES.small
            }}>Invitations envoyées</Text>
          </Pressable>
        </View>
      </View>
      {screen === 1 && <ContactInvitationScreen />}
      {screen === 2 && <ContactRequestScreen />}
    </>
  )
}