import { Platform, StyleSheet } from "react-native";

export const COLORS = {
  MAIN_BLUE: '#17418d',  //'#271d67'
  MAIN_RED: '#E94F15', // '#e5352d',
  MAIN_BLUE_LIGHT: '#00a7d5',
  MAIN_DARK: '#e4e4e4',
  ORANGE: '#FF6501',

  SECTION_PROGRAM: '#856ab1',
  SECTION_PARTNER: '#01bee6',
  SECTION_MY_DAY: '#ff6600',

  WHITE: '#FFFFFF',
  DARK: '#1A1D26',
  GRAY: '#9A9FAE',
  DARRWHITE: '#EEEEEE',
  LIGHTGREY: '#E9E9E9',
  DARKGRAY: '#9796A1',
  BLACK: '#000000',
  BLUE: '#1434CB',
  GREEN: '#36C07E',
  LIGHTORANGE: '#ffa479',
  DARKORANGE: '#c54121',
  RED: 'red',
};

export const SIZES = {
  base: 10,
  small: 12,
  font: 14,
  medium: 16,
  header: 20,
  large: 18,
  extraLarge: 24,
};

export const FONTS = {
  POPPINS_BLACK: 'Barlow-Black',
  POPPINS_BOLD: 'Barlow-Bold', // Poppins
  POPPINS_MEDIUM: 'Barlow-Medium',
  POPPINS_REGULAR: 'Barlow-Regular',
};

export const BORDERS_WITH_SHADOWS = {
  PROGRAM_CARD: StyleSheet.create({
    borderRadius: 20,
    shadowColor: '#281D67',
    shadowOpacity: Platform.OS === 'android' ? 0 : 0,
    shadowRadius: 20,
    elevation: Platform.OS === 'android' ? 0 : 0,
    borderWidth: 0.8,
    borderColor: '#B7B3CC',
  }),
  CONTACT_CARD: StyleSheet.create({
    borderRadius: 40,
    shadowColor: '#281D67',
    elevation: 2,
    backgroundColor: '#fff',
    borderColor: '#B7B3CC',
    borderWidth: 1,
  })
}

export const TEXT_SIZES = {
  PROGRAM_FIRST_TITLE: 15,
  PROGRAM_SECOND_TITLE: 17,
  PARAGRAPH: 14,
  CONTACT_CARD_FIRST_TITLE: 15,
  CONTACT_CARD_DESCRIPTION: 14
}