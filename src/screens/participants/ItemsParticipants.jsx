import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';

import { Avatar } from '@rneui/base';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { ConfirmationModal } from '../../components/modals/confirmation/ConfirmationModal';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { setSelectedParticiapantId } from '../../store/userSlice';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS } from '../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';

export const ItemsParticipants = (props) => {
  const {participant} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message',
  });
  const [loading, setLoading] = useState(false);

  const token = useSelector(({ user: { tokens } }) => tokens.access);

  const handleConsent = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${apiUrls.contacts}`,
        { participant: participant.id },
        { headers: { Authorization: `JWT ${token}` } },
      );
      setLoading(false);
      setIsVisible(false);
      props.refresh();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailParticipant', {
            intervetion: [],
            profile: participant.profil,
          });
          dispatch(setSelectedParticiapantId(participant.id));
        }}
        style={{
          backgroundColor: '#fff',
          marginVertical: 8,
          paddingBottom: 5,
          paddingHorizontal: 10,
          ...BORDERS_WITH_SHADOWS.CONTACT_CARD,

        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 50,
              marginTop: 4
            }}>
            <Avatar
              size={70}
              rounded
              containerStyle={{ backgroundColor: '#0D0D0D0D' }}
              source={{ uri: participant.photo_path }}
            >
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  {participant.profil.description !== '' && (<Image
                    source={{ uri: `${participant.profil.photo}` }}
                    style={{ width: 16, height: 16, borderRadius: 7.5 }}
                  />)}
                  {participant.is_speaker && <Image
                    source={require('../../components/assets/PICTO__SPEAKER.png')}
                    style={{ width: 16, height: 16, borderRadius: 7.5 }}
                  />}
                  {participant.is_expert && <Image
                    style={{ width: 16, height: 16 }}
                    source={require('../../components/assets/PICTO__EXPERT.png')}
                  />}
                </View>
              </View>
            </Avatar>
            <View style={{
              margin: 5,
              marginLeft: 10,
            }}>
              {(participant.prenom !== '' || participant.nom != '') && (
                <Text
                  numberOfLines={1}
                  style={{
                    color: COLORS.MAIN_BLUE,
                    fontSize: 16,
                    fontFamily: 'Poppins-Bold',
                    maxWidth: 250,
                    fontWeight: "bold",
                    marginBottom: 3,
                  }}>
                  {capitalizeStrOnFirstLetter(participant.prenom)} {capitalizeStrOnFirstLetter(participant.nom)}
                </Text>
              )}
               {participant.fonction !== '' && (
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: COLORS.MAIN_BLUE,
                    textAlign: 'left',
                    maxWidth: 200,
                    fontSize: 14,
                    fontWeight: "600"
                  }}>
                  {capitalizeStrOnFirstLetter(participant.fonction)}
                </Text>
              )}
    
              {participant.organisation.nom !== '' && !participant.from_structure && (
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTS.POPPINS_REGULAR,
                    color: COLORS.MAIN_BLUE,
                    maxWidth: 200,
                    fontSize: 13,
                    fontWeight: "500"
                  }}>
                  {participant.organisation.nom}
                </Text>
              )}
              {participant.from_structure && (
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: FONTS.POPPINS_REGULAR,
                    color: COLORS.MAIN_BLUE,
                    maxWidth: 200,
                    fontSize: 12
                  }}>
                  {capitalizeStrOnFirstLetter(participant.raison_sociale) || capitalizeStrOnFirstLetter(participant?.organisation?.adresse_organisation?.ville)}
                </Text>
              )}
              {!participant.from_structure && <Image
                source={{ uri: `${participant.organisation.logo}` }}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                  marginTop: 4,
                  marginBottom: 2 
                }}
              />}
            </View>
          </View>
          {participant.is_contact_status === 'invite' ? (
            <TouchableOpacity onPress={() => setIsVisible(true)} style={{}}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../components/assets/PICTO__AJOUT_CONTACT.png')}
              />
            </TouchableOpacity>
          ) : participant.is_contact_status === 'accepted' ? (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../components/assets/PICTO__VALIDE.png')}
            />
          ) : (
            <Image
              style={{ width: 30, height: 30 }}
              source={require('../../components/assets/PICTO__EN__ATTENTE.png')}
            />
          )}
        </View>
      </TouchableOpacity>
      <ConfirmationModal
        confirmMessage={`Etes-vous sûr(e) d'envoyer une demande de contact à ${capitalizeStrOnFirstLetter(participant.prenom)} ${capitalizeStrOnFirstLetter(participant.nom)} ?`}
        isVisible={isVisible}
        loading={loading}
        handleDeny={() => {
          setIsVisible(false);
        }}
        handleConsent={async () => await handleConsent()}
      />
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setIsVisible(false);
          setAlertInfo(prevState => ({ ...prevState, visible: false }));
        }}
      />
    </>
  );
};
