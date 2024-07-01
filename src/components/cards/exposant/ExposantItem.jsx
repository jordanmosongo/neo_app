import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';

export const ExposantItem = ({ exposant }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DetailPartenaire', { id: exposant.id });
      }}
      style={{
        backgroundColor: '#fff',
        marginVertical: 5,
        paddingVertical: 10,
        marginHorizontal: 12,
        borderColor: '#B7B3CC',
        borderTopWidth: 2.1,
        margin: 10,
        paddingBottom: 5,

      }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            style={{ width: 50, height: 50, resizeMode: 'contain', marginRight: 5 }}
            source={{ uri: exposant.logo }}
          />
          <View style={{ margin: 5 }}>
            <Text
              numberOfLines={2}
              style={{
                color: COLORS.MAIN_BLUE,
                fontFamily: FONTS.POPPINS_REGULAR,
                maxWidth: 185,                
              }}>
              {capitalizeStrOnFirstLetter(exposant.nom)}
            </Text>
            {exposant.domaine !== '' && (
              <Text
                style={{
                  fontFamily: FONTS.POPPINS_REGULAR,
                  color: COLORS.MAIN_BLUE,
                  textAlign: 'left',
                  fontSize: TEXT_SIZES.PARAGRAPH,
                  maxWidth: 180
                }}>
                {capitalizeStrOnFirstLetter(exposant.domaine)}
              </Text>
            )}
          </View>
        </View>
        {(exposant.stand.description && exposant.stand.description !== "") && <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
           }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../components/assets/PICTO__LIEU.png')}
            />
            <Text style={{ 
              fontFamily: 'Poppins-Regular', 
              color: COLORS.MAIN_BLUE,
              fontSize: 12,
              maxWidth: 80
            }}>
            {capitalizeStrOnFirstLetter(exposant.stand.description)}
            </Text>
          </TouchableOpacity>
        </View>}
      </View>
    </TouchableOpacity>
  );
};
