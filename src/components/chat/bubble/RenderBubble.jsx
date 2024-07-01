import React from 'react';
import { Alert } from 'react-native';
import { Bubble } from 'react-native-gifted-chat';
import { FONTS, TEXT_SIZES } from '../../../constants/theme';

export const RenderBubble = (props) => {
  return (
    <>
      <Bubble {...props}
        textStyle={{
          left: {
            color: '#3e3b7b', 
            fontFamily: FONTS.POPPINS_REGULAR,
            fontSize: TEXT_SIZES.PARAGRAPH
          },
          right: {
            color: '#465199', 
            fontFamily: FONTS.POPPINS_REGULAR,
            fontSize: TEXT_SIZES.PARAGRAPH
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: '#cceef7',
            borderRadius: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 0,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            marginBottom: 5
          },
          right: {
            backgroundColor: '#d4d2e1',
            borderRadius: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            borderBottomLeftRadius: 20,
            marginBottom: 5
          }
        }}
      />
    </>
  )
}