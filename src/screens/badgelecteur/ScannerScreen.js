// import { useNavigation, StackActions } from '@react-navigation/native';
// import React, {useState} from 'react';
// import {
//     SafeAreaView,
//     View,
//     Linking,
//   } from 'react-native';  
// import {CameraScreen} from 'react-native-camera-kit';
// import axios from 'axios';
// import apiUrls from '../../../apiUrls';
// import { useSelector } from 'react-redux';
// import { AlertScanModal } from '../../components/modals/alertScan/AlertScanModal';
import React from "react"
import { Text } from "react-native"

// export const ScannerScreen = () => {
//   const [qrvalue, setQrvalue] = useState('');
//   const [opneScanner, setOpneScanner] = useState(false);
//   const [canScan, setCanScan] = useState(true);
//   const [alertInfo, setAlertInfo] = useState({
//     visible: false,
//     title: 'Information',
//     message: 'En attente',
//     isLoading: false,
//     isFailedRequest: false
// });

// const navigation = useNavigation();
// const {tokens} = useSelector((state) => state.user);

// const manageAlertState = (visible, title, message, isLoading, isFailedRequest) => {
//   setAlertInfo({
//       visible,
//       title,
//       message,
//       isLoading,
//       isFailedRequest
//   });
// }

// async function handleScan(e) {
//   if (!canScan) {
//     console.log('cannot scan anymore', canScan);
//     return null;
//   }
//     try {
//         const scannedData = e;
//         if (scannedData || scannedData !== '') {
//             manageAlertState(true, 'Information', 'Veuillez patienter', true, false);
//             const { data } = await axios.post(`${apiUrls.scanQrCode}`, {
//                 code: scannedData
//             }, { headers: { Authorization: `JWT ${tokens.access}` } });  
//             setCanScan(false);
//             manageAlertState(true, 'Information', `${data.message}`, false, false);              
//         }        
//     } catch (error) {
//       if (error.message.includes('404')) {
//         return manageAlertState(true, 'QrCode invalid', `Vous avez scanné un mauvais qrcode !`, false, true);
//       }
//       if (error.message.includes('400')) {
//         return manageAlertState(true, 'Echec de mise en relation', `Rassurez-vous de ne pas scanner votre propre badge !`, false, true);
//       }
//       switch (error.code) {
//         case 'ERR_BAD_REQUEST' || 'BAD_REQUEST' || 'ERR_FORBIDDEN' || 'FORBIDDEN' :
//          return manageAlertState(true, `Echec`, `Une erreur s'est produite. Envisagez une déconnexion et reconnexion si elle persite !`, false, true);    
//         case 'ERR_NETWORK' :
//           return manageAlertState(true, 'Echec réseau', `Vous n'êtes pas connecté. Rassurez-vous que votre connexion est bonne puis réessayer !`, false, true);
//         default :  
//         return manageAlertState(true, 'Information', `Une erreur s'est produite !`, false, true); 
//       }  
//     }
// }

//   const onOpenlink = () => {
//     Linking.openURL(qrvalue);
//   };

//   const onBarcodeScan = (qrvalue) => {
//     setQrvalue(qrvalue);
//     setOpneScanner(false);
//   };


//   return (
//     <>
//      <SafeAreaView style={{flex: 1}}>
//         <View style={{
//             flex: 1,
//             }}>
//           <CameraScreen
//             showFrame={true}
//             scanBarcode={true}
//             laserColor={'blue'}
//             frameColor={'yellow'}
//             colorForScannerFrame={'black'}
//             onReadCode={async (event) => {
//                 onBarcodeScan(event.nativeEvent.codeStringValue);
//                 await handleScan(event.nativeEvent.codeStringValue)
//             }
              
//             }
//           />
//         </View>
      
//     </SafeAreaView>
//     <AlertScanModal
//       isAlertVisible={alertInfo.visible}
//       title={alertInfo.title}
//       confirmMessage={alertInfo.message}
//       isLoading={alertInfo.isLoading}
//       closeAlert={() => {
//         setAlertInfo({visible: false});
//         if (!alertInfo.isFailedRequest) {
//          return navigation.navigate('contacts')
//         } 
//         navigation.dispatch(StackActions.replace('Badgelecteur'));               
//       }}
//     />
//     </>
//   );
// };


export const ScannerScreen = () => {
  return (
    <Text>Scan</Text>
  )
}