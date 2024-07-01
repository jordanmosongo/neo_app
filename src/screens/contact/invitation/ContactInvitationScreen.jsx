import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { ContactCard } from '../../../components/cards/contact/ContactCard';
import apiUrls from '../../../../apiUrls';
import { contactService } from '../../../services/contactService';
import { setInvitationList, setRefreshNumber, setSelectedParticiapantId } from '../../../store/userSlice';
import { MaiLoaderComponent } from '../../../components/loaders/MainLoader';
import { EmptyListComponent } from '../../../components/empty/EmptyList';

import { AlertModal } from '../../../components/modals/alert/AlertModal';
import { ConfirmationModal } from '../../../components/modals/confirmation/ConfirmationModal';
import { ManageStatusComponent } from '../../../components/ManageStatusComponent';
import { useNavigation } from '@react-navigation/native';

export const ContactInvitationScreen = () => {
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState('');
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const data = useSelector(({ user }) => user.invitationList);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchInvitations = async () => {
    try {
      const result = await contactService.getInvitationList(token);
      setResponseResult(result);
      dispatch(setInvitationList(result));
    } catch (error) {
      setResponseError(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchInvitations();
    })();
  }, []);

  const handleAcceptation = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrls.contacts}`, {
        operation: 'accepter',
        demande_id: contactId
      }, { headers: { Authorization: `JWT ${token}` } });
      setLoading(false);
      setIsVisible1(false);
      dispatch(setRefreshNumber());
      await fetchInvitations();
    } catch (error) {
      setLoading(false);
      setIsVisible1(false);
      setAlertInfo({
        visible: true,
        title: 'Opération échouée !',
        message: "Veuillez vérifier votre connexion et réessayer."
      })
    }
  }
  const handleDenyConsent = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrls.contacts}`, {
        operation: 'refuser',
        demande_id: contactId
      }, { headers: { Authorization: `JWT ${token}` } });
      setLoading(false);
      setIsVisible2(false);
      await fetchInvitations();
    } catch (error) {
      setLoading(false);
      setIsVisible2(false);
      setAlertInfo({
        visible: true,
        title: 'Opération échouée !',
        message: "Veuillez vérifier votre connexion et réessayer."
      })
    }
  }

  return (
    <>
      {responseResult ?
        data.length > 0 ?
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{
              flex: 1,
              marginHorizontal: 20
            }}>
              {
                data.map(({ de_participant, id }, index) => (
                  <ContactCard
                    firstname={de_participant.user.prenom}
                    name={de_participant.user.nom}
                    photo={de_participant.photo}
                    role={de_participant.fonction}
                    profil={'profil'}
                    organization={de_participant.organisation.nom}
                    organizationEntity={de_participant.organisation}
                    from_structure={de_participant.from_structure}
                    raison_sociale={de_participant.raison_sociale}
                    mainButtonLabel={'Accepter'}
                    secondButtonLabel={'Refuser'}
                    mainButtonIcon={''}
                    secondButtonIcon={''}
                    isInvitation={true}
                    withCardAction={true}
                    requestId={id}
                    redirect={true}
                    handleRedirection={() => {
                      navigation.navigate('DetailParticipant', {
                        isNotParticipant: true
                      });
                      dispatch(setSelectedParticiapantId(de_participant.user.id));
                    }}
                    handleButtonClick={() => {
                      setIsVisible1(true);
                      setContactId(id);
                    }}
                    handleDeny={() => {
                      setIsVisible2(true);
                      setContactId(id);
                    }}
                    key={index}
                  />
                ))
              }
            </View>
            <ConfirmationModal
              confirmMessage={`Etes-vous sûr(e) d'accepter cette invitation ?`}
              isVisible={isVisible1}
              loading={loading}
              handleDeny={() => setIsVisible1(false)}
              handleConsent={async () => await handleAcceptation()}
            />
            <ConfirmationModal
              confirmMessage={`Etes-vous sûr(e) de refuser cette invitation ?`}
              isVisible={isVisible2}
              loading={loading}
              handleDeny={() => setIsVisible2(false)}
              handleConsent={async () => await handleDenyConsent()}
            />
            <AlertModal
              isAlertVisible={alertInfo.visible}
              title={alertInfo.title}
              confirmMessage={alertInfo.message}
              closeAlert={() => setAlertInfo((prevState) => ({ ...prevState, visible: false }))}
            />
          </ScrollView> : <EmptyListComponent message="Vous n'avez aucune invitation !" />
        : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchInvitations();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  )
}