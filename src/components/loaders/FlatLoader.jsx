import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

export const FlatLoader = () => {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
      backgroundColor: 'transparent'
    }}>
     <Text style={{
       color: COLORS.MAIN_BLUE,
       fontFamily: FONTS.POPPINS_REGULAR,
       fontSize: 12,
       marginRight: 10
    }}>Chargement</Text>
    <ActivityIndicator color={COLORS.MAIN_BLUE} size={20}/>
    </View>    
  )
}