// import React, { useEffect, useState } from 'react';
// import { View, Image, TouchableOpacity } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { RNCamera } from 'react-native-camera';
// import { AlertModal } from '../../components/modals/alert/AlertModal';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import apiUrls from '../../../apiUrls';
// import { StackActions, useNavigation } from '@react-navigation/native';
// import { AlertScanModal } from '../../components/modals/alertScan/AlertScanModal';
// import { COLORS } from '../../constants/theme';
// import { setRefreshNumber } from '../../store/userSlice';
import React from "react";
import { Text } from "react-native";

// function marker(color, size, borderLength, thickness = 2, borderRadius = 0) {
//   return (
//     <View style={{ height: size, width: size }}>
//       <View
//         style={{
//           position: 'absolute',
//           height: borderLength,
//           width: borderLength,
//           top: 0,
//           left: 0,
//           borderColor: color,
//           borderTopWidth: thickness,
//           borderLeftWidth: thickness,
//           borderTopLeftRadius: borderRadius,
//         }}
//       ></View>
//       <View
//         style={{
//           position: 'absolute',
//           height: borderLength,
//           width: borderLength,
//           top: 0,
//           right: 0,
//           borderColor: color,
//           borderTopWidth: thickness,
//           borderRightWidth: thickness,
//           borderTopRightRadius: borderRadius,
//         }}
//       ></View>
//       <View
//         style={{
//           position: 'absolute',
//           height: borderLength,
//           width: borderLength,
//           bottom: 0,
//           left: 0,
//           borderColor: color,
//           borderBottomWidth: thickness,
//           borderLeftWidth: thickness,
//           borderBottomLeftRadius: borderRadius,
//         }}
//       ></View>
//       <View
//         style={{
//           position: 'absolute',
//           height: borderLength,
//           width: borderLength,
//           bottom: 0,
//           right: 0,
//           borderColor: color,
//           borderBottomWidth: thickness,
//           borderRightWidth: thickness,
//           borderBottomRightRadius: borderRadius,
//         }}
//       ></View>
//     </View>
//   );
// }
// export default function ScanQrCode() {
//   const [image, setImage] = useState(null);
//   const [initNbre, setInitNbre] = useState(0);
//   const [canScan, setCanScan] = useState(true);
//   const [alertInfo, setAlertInfo] = useState({
//     visible: false,
//     title: 'Information',
//     message: 'En attente',
//     isLoading: false,
//     isFailedRequest: false
//   });

//   const { tokens } = useSelector((state) => state.user);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log('component is initialized', initNbre);
//   }, [initNbre])

//   const manageAlertState = (visible, title, message, isLoading, isFailedRequest) => {
//     setAlertInfo({
//       visible,
//       title,
//       message,
//       isLoading,
//       isFailedRequest
//     });
//   }

//   async function handleScan(e) {
//     if (!canScan) {
//       console.log('cannot scan anymore', canScan);
//       return null;
//     }
//     try {
//       const scannedData = e;
//       if (scannedData) {
//         manageAlertState(true, 'Information', 'Veuillez patienter', true, false);
//         const { data } = await axios.post(`${apiUrls.scanQrCode}`, {
//           code: scannedData.data
//         }, { headers: { Authorization: `JWT ${tokens.access}` } });
//         setCanScan(false);
//         manageAlertState(true, 'Information', `${data.message}`, false, false);
//       }
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
//   }

//   return (
//     <>
//       <View style={{ flex: 1 }}>
//         <View style={{ flex: 1 }}>
//           <QRCodeScanner
//             onRead={handleScan}
//             showMarker
//             flashMode={'off'}
//             reactivate={initNbre > 0}
//             customMarker={marker(COLORS.MAIN_BLUE_LIGHT, 200, 40)}
//             cameraStyle={{
//               height: '100%',
//             }}

//           />
//         </View>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginBottom: 5 }}>
//           {image && (
//             <Image
//               source={{ uri: image.uri }}
//               style={{ width: image.width, height: image.height }}
//             />
//           )}
//          </View>
//       </View>
//       <AlertScanModal
//         isAlertVisible={alertInfo.visible}
//         title={alertInfo.title}
//         confirmMessage={alertInfo.message}
//         isLoading={alertInfo.isLoading}
//         isFailedRequest={alertInfo.isFailedRequest}
//         closeAlert={async() => {
//           setAlertInfo({ visible: false });
//           dispatch(setRefreshNumber());
//           if (!alertInfo.isFailedRequest) {
//            return navigation.navigate('contacts');
//           }
//           navigation.dispatch(StackActions.replace('Badgelecteur'));  
//         }}
//       />
//     </>
//   );
// }


export default function ScanQrCode() {
  return (
    <>
     <Text>Scan</Text>
    </>
  )
}
