import React from 'react';
import { Avatar } from '@rneui/base';
import { Helpers } from '../../../../helpers/helpers';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setSelectedUser } from '../../../../store/userSlice';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, TEXT_SIZES } from '../../../../constants/theme';

export const DetailParticipantHeaderCard = (props) => {
  const { participantDetail, isNotParticipant } = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

   return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
        <Avatar
          size={90}
          rounded
          containerStyle={{ backgroundColor: '#0D0D0D0D' }}
          source={{
            uri: `${Helpers.getPhotoUrl(participantDetail?.photo)}`,
          }}
          >
          {(props.routeData && props.routeData.profile) && <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: participantDetail.is_expert && participantDetail.is_speaker ? -10 :  0,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'center',
               }}>
              {participantDetail.is_expert && (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../../../components/assets/PICTO__EXPERT.png')}
                />
              )}
              
                { participantDetail.is_speaker> 0 && (
                <Image
                  style={{ width: 20, height: 20 }}
                  source={require('../../../../components/assets/PICTO__SPEAKER.png')}
                />
              )}
              {props.routeData.profile.photo && (<Image
                source={{ uri: `${props.routeData.profile.photo}` }}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 7.5,
                  resizeMode: 'stretch',
                }}
              />)}
            </View>
          </View>}
        </Avatar>
        <View style={{ alignItems: 'center' }}>
          {participantDetail.is_contact_status === 'invite' ? (
            <TouchableOpacity
              onPress={() =>
                props.handleInvite()
              }
              style={{
                width: 30,
                height: 30,
                marginBottom: 20,
                marginLeft: 30,
              }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../../components/assets/PICTO__AJOUT_CONTACT.png')}
              />
            </TouchableOpacity>
          ) : participantDetail.is_contact_status === 'accepted' ? (
            <TouchableOpacity
              onPress={() => {
                const user = {
                  photo: participantDetail.photo,
                  name: participantDetail.user.nom,
                  firstname: participantDetail.prenom,
                  organization: participantDetail.organisation.nom,
                  organizationPhoto: participantDetail.organisation.logo || '',
                  role: participantDetail.fonction,
                  chatId: participantDetail.conversation.id,
                  chatName: participantDetail.conversation.room,
                  from_structure: participantDetail.from_structure,
                  raison_sociale: participantDetail.raison_sociale,
                  userId: participantDetail.user.id
                }
                dispatch(setSelectedUser(user));
                navigation.navigate('CHAT_SCREEN', { user });
              }}
              style={{
                backgroundColor: COLORS.MAIN_BLUE,
                paddingVertical: 5,
                paddingHorizontal: 15,
                borderRadius: 25,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: COLORS.WHITE,
                  textAlign: 'center',
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: TEXT_SIZES.PARAGRAPH
                }}>
                Message
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginBottom: 20,
                marginLeft: 30,
              }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../../components/assets/PICTO__EN__ATTENTE.png')}
              />
            </View>
          )}
          {!participantDetail.from_structure && (
            <TouchableOpacity
              onPress={() => {
                if (isNotParticipant) {
                  return null;
                }
                if (participantDetail?.organisation) {             
                  const id = participantDetail.organisation.id_exposant;
                  if (id !== '') {
                    navigation.navigate('DetailPartenaire', { id });
                  } else {
                    console.log("Cette organisation n'a pas de profil !");
                  }
                }
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: 'contain',
                }}
                source={{ uri: `${participantDetail?.organisation?.logo}` }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  )
}

