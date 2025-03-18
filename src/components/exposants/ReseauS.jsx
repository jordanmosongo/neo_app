import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import { Linking } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export const ReseauxS = (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      {(exposantDetail?.linkedin) && (
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => Linking.openURL(exposantDetail?.linkedin)}>
          <Image
            source={require('../../components/assets/PICTO__LINKEDIN.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )}
      {exposantDetail?.twitter && (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => Linking.openURL(exposantDetail?.twitter)}>
          <Image
            source={require('../../components/assets/PICTO__TWITTER.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const styles = StyleSheet.create({
    txt_btn: {
      textTransform: 'uppercase',
      textAlign: 'center',
      letterSpacing: 3,
      fontWeight: 'bold',
      color: '#fff',
    },
    container: {
      marginTop: 10,
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
      color: '#000',
    },
    safeArea: {
      flex: 1,
    },
    heading: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    hidden: {
      height: 0,
    },
    list: {
      overflow: 'hidden',
    },
    sectionTitle: {
      fontFamily: 'Poppins-Regular',
      fontSize: 18,
      height: 25,
      color: '#00c3ff',
      marginVertical: 0,
    },
    sectionDescription: {
      flex: 1,
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
      color: '#271d67',
      textAlign: 'justify',
      marginBottom: 1,
      marginTop: 1,
    },
    sectioncoordonnes: {
      marginTop: 1,
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      color: '#271d67',
      // marginBottom: 5,
    },
    divider: {
      borderBottomColor: 'grey',
      borderBottomWidth: 0.1,
      width: '100%',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 30,
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    details: {
      marginLeft: 10,
      justifyContent: 'center',
    },
    name: {
      fontSize: 14,
      color: COLORS.MAIN_BLUE,
      fontFamily: FONTS.POPPINS_BOLD,
      maxWidth: 200,
    },
    jobTitle: {
      fontSize: 13,
      color: COLORS.MAIN_BLUE,
      fontFamily: FONTS.POPPINS_REGULAR,
      maxWidth: 180,
      lineHeight: 22
    },
    videoPlayer: {
      height: Dimensions.get('screen').width * 0.5625,
    },
  });
