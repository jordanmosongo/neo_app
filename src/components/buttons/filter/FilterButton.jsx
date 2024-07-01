import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

export const FilterButton =  (props) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        paddingRight: 20,
    }}>
      <TouchableOpacity
        onPress={() => props.onFilterClick()}
        style={{
          paddingLeft: 8,
          justifyContent: 'center',
          alignItems: 'center'
       }}>
         <Text
            style={{
            color: COLORS.MAIN_BLUE,
             alignItems: 'flex-end',
             fontSize: 13,
             fontFamily: FONTS.POPPINS_REGULAR
           }}>
          Filtrer
          </Text>
         <Image
         source={require('../../assets/PICTO__FILTRER.png')}
           //source={require('../../components/assets/PICTO__FILTRER.png')}           
           style={{
           width: 20,
           height: 20,
        }}
        />
        </TouchableOpacity>
      </View>
  )
}