import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
// import OneSignal from 'react-native-onesignal';
import RootNavigation from './src/screens/navigation/RootNavigation';

import { useDispatch } from 'react-redux';
import { COLORS } from './src/constants/theme';
// import { setPlayerId } from './src/store/userSlice';
// import { navigateWithoutParamsToScreen } from './OutSideNavigation';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import UserHelper from './src/helpers/UserHelper';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();  

  // // OneSignal initialization
  // OneSignal.setLogLevel(6, 0);
  // // OneSignal.setAppId('6f945f1b-3996-4158-958c-71ff3381f5ce');
  // OneSignal.setAppId('3b809030-ba96-426a-8225-6083e7cf9386');

  // OneSignal.promptForPushNotificationsWithUserResponse();

  // // Get the device infos
  // OneSignal.getDeviceState().then((deviceState) => {
  //   dispatch(setPlayerId(deviceState.userId));
  // }).catch((err) => console.log('error on catch the device state'));

  // // method to handle notifications received while app in foreground
  // OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent) => {
  //   let notification = notificationReceivedEvent.getNotification();
  //   const data = notification.additionalData;
  //   notificationReceivedEvent.complete(notification);
  // })

  // // Method to handle notifications opened
  // OneSignal.setNotificationOpenedHandler(async(notification) => {
  //   const storageData = await AsyncStorage.getItem('@USER');
  //   const parsedStoragedata = JSON.parse(storageData);

  //   if(!UserHelper.isConnected(parsedStoragedata)) {
  //     return navigateWithoutParamsToScreen('Login');
  //   }
  //   return navigateWithoutParamsToScreen('NOTIFICATION_SCREEN');
  // })

  return (    
    <>
      <StatusBar animated
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor= {COLORS.MAIN_BLUE} // '#271d67'
      />
      <RootNavigation/>   
    </>
  );
}

export default App;
