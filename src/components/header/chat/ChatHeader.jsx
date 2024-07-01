import React, { useState } from "react";
import { View, Text, Alert, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import { Badge } from 'react-native-paper';
import jwt_decode from 'jwt-decode';
import axios from "axios";

import {styles} from './ChatHeaderStyles';
import { ConfirmationModal } from "../../modals/confirmation/ConfirmationModal";
import { messageService } from "../../../services/messageService";
import { useSelector, useDispatch } from "react-redux";
import { AlertModal } from "../../modals/alert/AlertModal";
import { setCanRefreshChat, setRendezVous } from "../../../store/userSlice";
import { AppointmentViewModal } from "../../modals/appointmentView/AppointmentViewModal";
import apiUrls from "../../../../apiUrls";

export const ChatHeader = (props) => {
  const { user } = props;

 const [showRendezVous, setShowRendezVous] = useState(false);
 const [isAccepting, setIsAccepting] = useState(false);
 const [isDenying, setIsDenying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });
  const [canReload, setcanReload] = useState(false);

  const token = useSelector(({user: {tokens}}) => tokens.access);
  const rendezVous = useSelector(({user: {rendezVous}}) => rendezVous);
  const dispatch = useDispatch();

  const { participant_id } = jwt_decode(token);

  const checkRendezVous = () => {
    const keys = Object.keys(rendezVous);
    if (keys.length === 0) {
      return false;
    }
    return true;
  }

  const checkRatherIsEmitor = () => {
    if ( checkRendezVous() && participant_id === rendezVous.emeteur) {
      return true;
    }
    return false;
  }

  const handleConsent = async () => {
    try {
      setLoading(true)
      await messageService.deleteConversation(user.chatId, token);
      setcanReload(true);
      setAlertInfo({
        visible: true,
        title: 'Opération réussie',
        message: "La conversation est supprimée avec succès !"
      })
    } catch (error) {
      // Instruction on error
    } finally {
      setLoading(false);
      setIsVisible(false);
    }
  }
  const denyRendezVous = async () => {
    try {
      setIsDenying(true);
      const {data} = await axios.post(`${apiUrls.appointmentBase}/participer`, {
        'programme': rendezVous.programme.id,
        'participant': rendezVous.destinateur,
        'choix': 'refuser'
      }, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setcanReload(false);      
      setAlertInfo({
        visible: true,
        title: 'Rendez-vous refusé',
        message: `Vous avez refusé avec succès le rendez-vous de ${user.firstname} ${user.name}`
      })
      dispatch(setRendezVous({}));
      setShowRendezVous(false);
    } catch (error) {
      setAlertInfo((prevState) => ({...prevState, visible: false}));
      console('error occured on deny appointment', error);
    } finally {
      setIsDenying(false);
    }
  }
  const acceptRendezVous = async () => {
    try {
      setIsAccepting(true);
      const result = await axios.post(`${apiUrls.appointmentBase}/participer`, {
        'programme': rendezVous.programme.id,
        'participant': rendezVous.destinateur,
        'choix': 'accepter'
      }, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      setcanReload(false);
      
      setAlertInfo({
        visible: true,
        title: 'Rendez-vous accepté',
        message: `Vous avez accepté avec succès le rendez-vous de ${user.firstname} ${user.name}`
      })
      dispatch(setRendezVous({}));
      setShowRendezVous(false);
      
    } catch (error) {
      setAlertInfo((prevState) => ({...prevState, visible: false}));
    } finally {
      setIsAccepting(false);
    }
  }
  
    return (
      <>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>{user.firstname} {user.name}</Text>
            </View>
          <View style={{
            flexDirection: 'row'
          }}>
           {checkRendezVous() && <View style={{marginRight: 15, position: 'relative'}}>
              <Icon
                name="calendar"
                type="ionicon"
                size={18}
                color="#fff"
                onPress={() => setShowRendezVous(true)}
              />  
              <Badge onPress={() => setShowRendezVous(true)} 
                size={18} style={{
                backgroundColor: 'red',
                color: '#fff',
                fontSize: 6,
                fontWeight: 'bold',
                position: 'absolute',
                top: -9,
                right: -9
              }}>new</Badge>
            </View> }
            <Icon
            name="trash"
            type="ionicon"
            size={18}
            color="#fff"
            onPress={() => setIsVisible(true)}
            />               
          </View>
        </View>
           <ConfirmationModal
            confirmMessage={`Toute la conversation avec ${user.firstname} ${user.name} sera supprimée. Etes-vous sûr(e) de supprimer ?`}
            isVisible={isVisible}
            loading={loading}
            handleDeny={() => setIsVisible(false)}
            handleConsent={async() => await handleConsent()}
            />
          <AppointmentViewModal
            title={`${checkRatherIsEmitor() ? `Votre rendez-vous avec ${user.firstname} ${user.name} est en attente`: ` Vous avez un nouveau rendez-vous avec ${user.firstname} ${user.name}`} `}
            confirmMessage={`Vous avez un nouveau rendez-vous`}
            isEmitor={checkRatherIsEmitor()}
            rendezVous={rendezVous}
            isVisible={showRendezVous}
            loading={false}
            isAccepting={isAccepting}
            isDenying={isDenying}
            handleDeny={async () => await denyRendezVous()}
            handleConsent={async() => await acceptRendezVous()}
            closeModal={() => setShowRendezVous(false)}
          />
            <AlertModal
              isAlertVisible={alertInfo.visible}
              title={alertInfo.title}
              confirmMessage={alertInfo.message}
              closeAlert={() => {
                if (canReload) {
                  dispatch(setCanRefreshChat()); 
                }
                setAlertInfo((prevState) => ({...prevState, visible: false}));
                setShowRendezVous(false);                       
              }}
            />  
             
      </>
    )
}