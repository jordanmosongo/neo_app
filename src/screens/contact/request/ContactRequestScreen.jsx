import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { ContactCard } from '../../../components/cards/contact/ContactCard';
import apiUrls from '../../../../apiUrls';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { contactService } from '../../../services/contactService';
import { setRequestList, setSelectedParticiapantId } from '../../../store/userSlice';
import { MaiLoaderComponent } from '../../../components/loaders/MainLoader';
import { EmptyListComponent } from '../../../components/empty/EmptyList';
import { ConfirmationModal } from '../../../components/modals/confirmation/ConfirmationModal';
import { AlertModal } from '../../../components/modals/alert/AlertModal';
import { ManageStatusComponent } from '../../../components/ManageStatusComponent';
import { useNavigation } from '@react-navigation/native';

export const ContactRequestScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactId, setContactId] = useState('');
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const data = useSelector(({ user: { requestList } }) => requestList);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const result = await contactService.getRequestList(token);
      setResponseResult(result);
      dispatch(setRequestList(result));
      setIsLoading(false);
    } catch (error) {
      console.log('error occured', error);
      setResponseError(error);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchRequests();
    })();
  }, []);

  const handleConsent = async () => {
    try {
      setLoading(true);
      await axios.put(`${apiUrls.contacts}`, {
        operation: 'annuler',
        demande_id: contactId
      }, { headers: { Authorization: `JWT ${token}` } });
      setLoading(false);
      setIsVisible(false);
      await fetchRequests();
    } catch (error) {
      setIsLoading(false);
      setIsVisible(false);
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
        (data.length > 0 ? <ScrollView style={{ backgroundColor: '#fff' }}>
          <View style={{
            flex: 1,
            marginHorizontal: 20
          }}>
            {
              data.map(({ a_participant, id }, index) => (
                <ContactCard
                  firstname={a_participant.user.prenom}
                  name={a_participant.user.nom}
                  photo={a_participant.photo}
                  role={a_participant.fonction}
                  profil={'Intervenant'}
                  organization={a_participant.organisation.nom}
                  organizationPhoto={a_participant.organisation.logo || ''}
                  organizationEntity={a_participant.organisation}
                  from_structure={a_participant?.from_structure}
                  raison_sociale={a_participant?.raison_sociale}
                  mainButtonLabel={'Annuler'}
                  secondButtonLabel={'Refuser'}
                  mainButtonIcon={''}
                  secondButtonIcon={''}
                  withCardAction={true}
                  redirect={true}
                  handleRedirection={() => {
                    navigation.navigate('DetailParticipant', {
                      isNotParticipant: true
                    });
                    dispatch(setSelectedParticiapantId(a_participant.user.id));
                  }}
                  handleButtonClick={() => {
                    setIsVisible(true);
                    setContactId(id);
                  }}
                  key={index}
                />
              ))
            }
          </View>
          <ConfirmationModal
            confirmMessage={`Etes-vous sûr(e) d'annuler cette demande ?`}
            isVisible={isVisible}
            loading={loading}
            handleDeny={() => setIsVisible(false)}
            handleConsent={async () => await handleConsent()}
          />
          <AlertModal
            isAlertVisible={alertInfo.visible}
            title={alertInfo.title}
            confirmMessage={alertInfo.message}
            closeAlert={() => setAlertInfo((prevState) => ({ ...prevState, visible: false }))}
          />
        </ScrollView> : <EmptyListComponent message={'Aucune invitation envoyée !'} />) : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchRequests();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  )
}