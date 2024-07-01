import { StyleSheet } from 'react-native';
import { FONTS, SIZES, TEXT_SIZES } from './theme';

export const globalStyles = StyleSheet.create({
  onboardingText: {
    fontFamily: FONTS.POPPINS_BLACK
  },
  firstLevelTitle: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: SIZES.large
  },
  secondLevelTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.medium
  },
  cardFirstLevelTitle: {
    fontFamily: FONTS.POPPINS_BOLD,
    fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
    lineHeight: 26
  },
  cardFirstLevelTitleBlack: {
    fontFamily: FONTS.POPPINS_BLACK,
    fontSize: SIZES.medium,
    lineHeight: 26
  },
  cardSecondLevelTitle: {
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: SIZES.font,
    lineHeight: 24
  },

  cardParagraphe: {
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: SIZES.small,
    lineHeight: 20
  },
  container: {

  }
})