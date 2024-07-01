import React, {useEffect, useState} from 'react';
import { AlertModal } from './modals/alert/AlertModal';
import { useNavigation } from '@react-navigation/native';

export const ManageStatusComponent = (props) => {
  const {error, nbreOfRepetitions} = props;
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message',
  }); 

  const navigation = useNavigation();

  const manageAlertInfo = (visible, title, message) => {
    setAlertInfo({
      visible,
      title,
      message,
    });
  }
  useEffect(() => { 
    const code = error?.code;
      console.log('error from status manager', {
        code: error.code,
        message: error.message,
        name: error.name
      });
      switch (code) {
        case 'ERR_BAD_REQUEST' || 'BAD_REQUEST' || 'ERR_FORBIDDEN' || 'FORBIDDEN' :
         return manageAlertInfo(true, 'Opération échouée', 'Le serveur n\'a pas reconnu cette requête !');
        case 'ERR_NETWORK' :
         return manageAlertInfo(true, 'Echec de réseau', "Vous n'êtes connectés à aucun réseau. Rassurez-vous que votre connexion est bonne puis réessayez");
        default :  
         return manageAlertInfo(true, 'Information', "Une erreur est survenue ! Le serveur n'a pas pu traiter cette information");    
      }  
   }, [nbreOfRepetitions]);

  return (
    <>
     <AlertModal
       isAlertVisible={alertInfo.visible}
       title={alertInfo.title}
       confirmMessage={alertInfo.message}
       isStatusError={props.isStatusError}
       abortErrorAction={() => {
        setAlertInfo(prevState => ({ ...prevState, visible: false }));
        navigation.goBack();
       }}
       closeAlert={() => {
         setAlertInfo(prevState => ({ ...prevState, visible: false }));
         props.handleActionOnError();
       }}
     />
    </>
  )
}