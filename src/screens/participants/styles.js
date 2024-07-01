import {StyleSheet} from 'react-native';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 16,
  },
  text: {
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PARAGRAPH,
    paddingVertical: 10,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginLeft: 5,
    // width: '60%',
  },
});
