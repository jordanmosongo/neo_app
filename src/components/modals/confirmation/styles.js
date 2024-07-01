import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../../constants/theme';

export const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FONTS.POPPINS_MEDIUM,
  },
  text: {
    color: COLORS.MAIN_BLUE,
    paddingVertical: 10,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 20,fontFamily: 'Poppins-Regular',
  },
  button: {
    marginLeft: 5
  }
});