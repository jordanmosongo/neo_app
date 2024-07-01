/* import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'; */

 export async function requestUserPermission() {
 /*  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization enabled:', enabled);
    console.log('Authorization status:', authStatus);
    await getFCMToken()
  } */
}

async function getFCMToken(){
   /*  let fcmtoken = await AsyncStorage.getItem('fcmtoken');

    if(!fcmtoken){
        try {
            const fcmtoken =  await messaging().getToken()
            if(fcmtoken){                
              await AsyncStorage.setItem('fcmtoken',fcmtoken);
            } else {
              console.log('no token sent', fcmtoken);
            }
            
        } catch (error) {
            console.log(error,'Erreur dans fcmtoken');
        }
    } else {
      console.log('fcmtoken', fcmtoken);
    } */
}

export const notificationListner =()=>{
// Assume a message-notification contains a "type" property in the data payload of the screen to open

    /* messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
 */
  // Check whether an initial notification is available
  /* messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    }).catch(error => console.log('Echech ici', error));
    
    messaging().onMessage(async (remoteMessage) => {
        console.log("notification de mon statee.............. ", remoteMessage )
    }) */
}