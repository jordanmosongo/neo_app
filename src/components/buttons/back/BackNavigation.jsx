import React from 'react';
import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../../../constants/theme';
import { useDispatch } from 'react-redux';
import { setRefreshHeaderNotifNumber } from '../../../store/userSlice';

export const BackNavigation = ({title, goBack, paddingVertical}) => {
   const dispatch = useDispatch();
    return (
      <>
        <View style={{ justifyContent: 'flex-start' }}>
          <TouchableOpacity 
          onPress={() => {
            dispatch(setRefreshHeaderNotifNumber());
            goBack();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical,
          }}
          >            
            <View style={{
              backgroundColor: '#271d67',
              width: 20,
              height: 20,
              borderRadius: 100,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Icon
                name="chevron-back-outline"
                type="ionicon"
                size={15}
                color="#fff"
                onPress={() => goBack()}
            /> 
            </View>
            <Text style={{
               color: COLORS.MAIN_BLUE, 
               marginLeft: 10,
               fontFamily: FONTS.POPPINS_REGULAR,
               fontSize: TEXT_SIZES.PARAGRAPH
               }}>
               {/*  {title} */}
               Précédent
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
}