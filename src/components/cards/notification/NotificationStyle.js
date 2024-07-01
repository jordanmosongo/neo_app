import { StyleSheet } from 'react-native';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    ...BORDERS_WITH_SHADOWS.CONTACT_CARD,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 10,
    position: 'relative',
    padding: 15,
  },
  elementContainer: {
    flexDirection: 'row',
    paddingBottom: 4,
    width: '85%',
    paddingRight: 4
  },
  elementTitle: {
    fontSize: 13,
    color: COLORS.MAIN_BLUE,
    marginBottom: 2,
    maxWidth: '95%',
    fontFamily: FONTS.POPPINS_BOLD
  },
  text: {
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: 13
  }
})

