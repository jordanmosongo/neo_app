import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking
} from 'react-native';
import { COLORS, FONTS, TEXT_SIZES } from '../../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../../helpers/helperFunctions';

export const DetailParticipantBodyCard = (props) => {

  const { participantDetail } = props;

  const checkExpectedParam = (key) => {
    let expectedParam = false;
    for(const parameter of participantDetail.parametres) {
      if(parameter['parametre'] === key) {
        expectedParam = parameter.etat;
        break;
      }
    }
    return expectedParam;
  }

  return (
    <>
      <View style={{
        marginBottom: 5,
        marginTop: -15,
      }}>
        <Text
          numberOfLines={3}
          style={{
            fontSize: TEXT_SIZES.CONTACT_CARD_FIRST_TITLE,
            color: COLORS.MAIN_BLUE,
            fontFamily: FONTS.POPPINS_BOLD,
            maxWidth: 250,
          }}>
          {`${capitalizeStrOnFirstLetter(participantDetail?.user?.prenom)} ${capitalizeStrOnFirstLetter(participantDetail?.user?.nom)}`}
        </Text>
        <Text
          numberOfLines={3}
          style={{
            fontSize: TEXT_SIZES.CONTACT_CARD_DESCRIPTION,
            color: COLORS.MAIN_BLUE,
            fontFamily: FONTS.POPPINS_REGULAR,
            maxWidth: 180,
          }}>
          {participantDetail?.fonction}
        </Text>
        {participantDetail.from_structure && <Text
          numberOfLines={1}
          style={{
            fontSize: TEXT_SIZES.CONTACT_CARD_DESCRIPTION,
            color: COLORS.MAIN_BLUE,
            fontFamily: FONTS.POPPINS_REGULAR,
          }}>
          {participantDetail.raison_sociale || participantDetail?.organisation?.adresse_organisation?.ville}
        </Text>}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginTop: 10 }}>
            {checkExpectedParam('TELEPHONE') && (
            <>
            {participantDetail?.coordonnes?.telephone
              ?.telephone_fixe && (
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../../../components/assets/PICTO__TEL.png')}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 5,
                      marginBottom: 5,
                    }}
                  />
                  <Text style={styles.sectioncoordonnes}>
                    {
                      participantDetail?.coordonnes?.telephone
                        ?.telephone_fixe
                    }
                  </Text>
                </View>
              )}
            {participantDetail?.coordonnes?.telephone
              ?.telephone_portable && (
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={require('../../../../components/assets/PICTO__TEL.png')}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 5,
                      marginBottom: 5,
                    }}
                  />
                  <Text style={styles.sectioncoordonnes}>
                    {
                      participantDetail?.coordonnes?.telephone
                        ?.telephone_portable
                    }
                  </Text>
                </View>
              )}
            </>
            )}
            {checkExpectedParam('EMAIL') && <>
            {participantDetail?.coordonnes?.email && (
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${participantDetail?.coordonnes?.email}`)}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../../../components/assets/PICTO__MAIL.png')}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: 5,
                    marginBottom: 5,
                  }}
                />
                <Text style={styles.sectioncoordonnes}>
                  {participantDetail?.coordonnes?.email}
                </Text>
              </TouchableOpacity>
            )}
            </>}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}>

          {participantDetail?.reseausociaux?.map((socialNet, index) => {
            if (socialNet.url) {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 10
                  }}
                  onPress={() => Linking.openURL(socialNet.url) }>  
                  {socialNet.nom === 'twi' ? <Image
                    source={require('../../../../components/assets/PICTO__TWITTER.png')}
                    style={{ width: 30, height: 30 }}
                  /> : <Image
                    source={require('../../../../components/assets/PICTO__LINKEDIN.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  }
                </TouchableOpacity>
              )
            }            
          })
          }
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  sectioncoordonnes: {
    marginTop: 1,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PARAGRAPH,
    color: COLORS.MAIN_BLUE,
    marginBottom: 5,
  },

});
