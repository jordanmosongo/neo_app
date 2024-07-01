import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { ConfirmationModal } from '../../components/modals/confirmation/ConfirmationModal';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS, SIZES } from '../../constants/theme';
import { setSelectedParticiapantId } from '../../store/userSlice';
import jwt_decode from 'jwt-decode';
import { Card } from 'react-native-paper';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';


export const IntervenantItem = (props) => {
    const {
      nom,
      photo,
      prenom,
      fonction,
      entreprise,
      id,
      is_contact_status,
      profils,
      is_expert,
      is_speaker,
      from_structure,
      raison_sociale,
      organisation
    } = props;
  
    const [isVisible, setIsVsible] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
      visible: false,
      title: 'Titre',
      message: 'message',
    });
    const token = useSelector(({ user: { tokens } }) => tokens.access);
    const { participant_id } = jwt_decode(token);
  
  
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const handleConsent = async () => {
      try {
        setLoading(true);
        await axios.post(
          `${apiUrls.contacts}`,
          { participant: id },
          { headers: { Authorization: `JWT ${token}` } },
        );
        props.refresh();
      } catch (error) {
        console.log('error on get in contact from detail programme', error);
      } finally {
        setIsVsible(false);
        setLoading(false);
      }
    };
  
    return (
      <Card
        mode='contained'
        style={{
          borderRadius: 0,
          backgroundColor: 'transparent'
        }}
        onPress={() => {
          if (id === participant_id) {
            return null;
          }
          navigation.navigate('DetailParticipant', {
            profile: profils
          });
          dispatch(setSelectedParticiapantId(id));
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
            padding: 10,
            ...BORDERS_WITH_SHADOWS.CONTACT_CARD
          }}>
          <View
            style={{
              margin: 0,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Avatar
              size={70}
              rounded
              source={{ uri: photo }}
              containerStyle={{ backgroundColor: '#0D0D0D0D' }}
              title={nom[0] + prenom[0]}
              titleStyle={{ color: '#000' }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  flexDirection: 'row',
                }}>
                {is_expert && (
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../../components/assets/PICTO__EXPERT.png')}
                  />
                )}
                {is_speaker && (
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../../components/assets/PICTO__SPEAKER.png')}
                  />
                )}
                {profils.photo && (
                  <Image
                    source={{ uri: `${profils.photo}` }}
                    style={{ width: 15, height: 15, borderRadius: 7.5 }}
                  />
                )}
                {(profils.description === 'Intervenant' && !is_speaker) && (
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('../../components/assets/PICTO__SPEAKER.png')}
                  />
                )}
              </View>
            </Avatar>
            <View style={{ width: 200, marginLeft: 10 }}>
              <Text
                style={{
                  fontFamily: FONTS.POPPINS_BOLD,
                  color: COLORS.MAIN_BLUE,
                  fontSize: SIZES.font,
                }}>
                  {`${capitalizeStrOnFirstLetter(prenom)} ${capitalizeStrOnFirstLetter(nom)}` }
              </Text>
              <Text
                style={{
                  color: COLORS.MAIN_BLUE,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: 12,
                }}>
                {capitalizeStrOnFirstLetter(fonction)}
              </Text>
              <Text
                style={{
                  color: COLORS.MAIN_BLUE,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: 12,
                }}>
                {/* Vérifier tout ce qui structure ici */}
                {from_structure ?
                  raison_sociale && raison_sociale !== '' ?
                    capitalizeStrOnFirstLetter(raison_sociale) : capitalizeStrOnFirstLetter(organisation.adresse_organisation.ville)
                  : capitalizeStrOnFirstLetter(entreprise)}
              </Text>
            </View>
          </View>
          {is_contact_status === 'invite' && (
            <TouchableOpacity onPress={() => setIsVsible(true)} style={{}}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('../../components/assets/PICTO__AJOUT_CONTACT.png')}
              />
            </TouchableOpacity>
          )}
          {is_contact_status === 'accepted' && (
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../components/assets/PICTO__VALIDE.png')}
            />
          )}
          {is_contact_status === 'pending' && (
            <Image
              style={{ width: 25, height: 25 }}
              source={require('../../components/assets/PICTO__EN__ATTENTE.png')}
            />
          )}
        </View>
        <ConfirmationModal
          confirmMessage={`Etes-vous sûr(e) d'envoyer une demande de contact à ${nom} ${prenom} ?`}
          isVisible={isVisible}
          loading={loading}
          handleDeny={() => setIsVsible(false)}
          handleConsent={handleConsent}
        />
        <AlertModal
          isAlertVisible={alertInfo.visible}
          title={alertInfo.title}
          confirmMessage={alertInfo.message}
          closeAlert={() => {
            setAlertInfo({ visible: false });
          }}
        />
      </Card>
    );
  };