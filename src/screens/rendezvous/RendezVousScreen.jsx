import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { MainHeader } from '../../components/header/main/MainHeader';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { useNavigation } from '@react-navigation/native';
import { ContactCard } from '../../components/cards/contact/ContactCard';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import axios from "axios";
import { setRefreshHeaderNotifNumber } from '../../store/userSlice';
import { userServices } from '../../services/userServices';
import apiUrls from '../../../apiUrls';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';


export const RendezVousScreen = ({ route }) => {
  const [isDenying, setIsDenying] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const { tokens, selectedEvenementId } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { dataTarget, emitor, notificationId } = route.params;
  const { participant_id } = jwt_decode(tokens.access);

  const managestate = (choice, booleanValue) => {
    choice === 'refuser' ? setIsDenying(booleanValue) : setIsAccepting(booleanValue);
  }

  const handleRendezVousChoice = async (choice) => {
    try {
      managestate(choice, true);
      const { data } = await axios.post(`${apiUrls.appointmentBase}/participer`, {
        'programme': dataTarget?.id_programme,
        'participant': participant_id,
        'choix': choice
      }, {
        headers: {
          Authorization: `JWT ${tokens.access}`,
        },
      });

      if (data) {
        const result = await userServices.updatStatNotification(
          { etat: true },
          tokens.access,
          notificationId,
        );
        dispatch(setRefreshHeaderNotifNumber());
        if (choice === 'refuser') {
          navigation.navigate('NOTIFICATION_SCREEN', { refresh: true });
        } else {
          navigation.navigate('Dashboard');
        }
      }

    } catch (error) {
      console('error occured on appointment', error);
    } finally {
      managestate(choice, false);
    }
  }

  return <>
    <MainHeader noBackAction={true} />
    <View style={{ backgroundColor: '#fff', padding: 20 }}>
      <BackNavigation title={'Précédent'} goBack={() => navigation.goBack()} />
    </View>
    <ScrollView style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#ff6600', paddingHorizontal: 10, paddingVertical: 2 }}>
          <Text style={{ color: '#fff', fontFamily: FONTS.POPPINS_REGULAR }}>{dataTarget?.heure_debut}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
          <Icon
            name="location-outline"
            type="ionicon"
            color="#271d67"
            size={20}
          />
          <Text style={{ 
            color: COLORS.MAIN_BLUE, 
            fontFamily: FONTS.POPPINS_REGULAR,
            fontSize: TEXT_SIZES.PARAGRAPH
          }}>{dataTarget?.stand.code}</Text>
        </View>
      </View>
      <Text style={{
        color: COLORS.MAIN_BLUE,
        marginVertical: 5,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: TEXT_SIZES.PARAGRAPH
      }}>Rendez-vous</Text>

      <Text style={{
        color: COLORS.MAIN_BLUE,
        marginBottom: 5,
        fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
          fontFamily: FONTS.POPPINS_BOLD
        }}>{dataTarget?.titre}</Text>
      <Text style={{
        color: COLORS.MAIN_BLUE,
        marginBottom: 5,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: TEXT_SIZES.PARAGRAPH
      }}>{dataTarget?.description}</Text>
      {(dataTarget?.lieu && dataTarget?.lieu !== '') && <Text style={{
        color: COLORS.MAIN_BLUE,
        marginVertical: 5,
        fontFamily: FONTS.POPPINS_REGULAR,
        fontSize: TEXT_SIZES.PARAGRAPH
      }}>Lieu : {dataTarget?.lieu}</Text>}
      <View style={{
        borderTopWidth: 2,
        borderColor: '#00a7d5',
        marginVertical: 10,
        paddingVertical: 10
      }}>
        <Text style={{
          color: COLORS.MAIN_BLUE,
          fontFamily: FONTS.POPPINS_REGULAR,
          fontSize: TEXT_SIZES.PARAGRAPH
        }}>Demande de rendez-vous avec</Text>
        <ContactCard
          firstname={emitor.prenom}
          name={emitor.nom}
          photo={emitor.photo}
          role={emitor.fonction}
          profil={'profil'}
          organization={emitor.organisation.nom}
          organizationEntity={emitor.organisation}
          from_structure={emitor.from_structure}
          raison_sociale={emitor.raison_sociale || ""}
          mainButtonLabel={isAccepting ? 'Patienter...' : 'Accepter'}
          secondButtonLabel={isDenying ? '' : 'Refuser'}
          mainButtonIcon={''}
          secondButtonIcon={''}
          isInvitation={true}
          withCardAction={true}
          isDenying={isDenying}
          isAccepting={isAccepting}
          handleButtonClick={async () => await handleRendezVousChoice('accepter')}
          handleDeny={async () => await handleRendezVousChoice('refuser')}
        />
      </View>
    </ScrollView>
   </>
}