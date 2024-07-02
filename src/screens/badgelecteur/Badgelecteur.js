import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import QrCode from './QrCode';
import ScanQrCode from './ScanQrCode';
import { MainHeader } from '../../components/header/main/MainHeader';
import { Platform, View } from 'react-native';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS } from '../../constants/theme';
import { ScannerScreen } from './ScannerScreen';

const Tab = createMaterialTopTabNavigator();

const Badgelecteur = () => {
  const navigation = useNavigation();
  return (
    <>
      <MainHeader
        withTitle={true}
        title="Lecteur de bagde"
        noBackAction={true} />
      <View style={{ backgroundColor: COLORS.WHITE, paddingHorizontal: 20 }}>
        <BackNavigation
          title={'Tableau de bord'}
          goBack={() => navigation.goBack()}
          paddingVertical={15}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.MAIN_BLUE,
          tabBarIndicatorContainerStyle: {
            elevation: 0,
          },
          tabBarLabelStyle: {
            fontFamily: FONTS.POPPINS_REGULAR,
            textTransform: 'capitalize'
          },
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.MAIN_BLUE_LIGHT
          }
        }}
      >
        <Tab.Screen
          name="Mon qrcode"
          options={{
            tabBarLabel: 'Mon qrcode'
          }}
          component={QrCode}
        />
        {/* <Tab.Screen name="Scanner un qrcode" component={ScanQrCode} />         */}
        <Tab.Screen name="Scanner un qrcode" component={ScannerScreen} />
      </Tab.Navigator>
    </>
  );
};

export default Badgelecteur;
