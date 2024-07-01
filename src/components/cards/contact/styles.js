import { StyleSheet } from 'react-native';
import { BORDERS_WITH_SHADOWS, FONTS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    ...BORDERS_WITH_SHADOWS.CONTACT_CARD,
    marginVertical: 10,
    paddingBottom: 10,
    position: 'relative',
    padding: 15,
  },
  elementContainer: {
    flexDirection: 'row', 
    width: '100%'
  },
  elementTitle: {
    fontSize: 15,
    color: '#281D67',
    marginBottom: 2,
    fontFamily: FONTS.POPPINS_BOLD,
  },
  text: {
    color: '#5D568D',
    fontFamily: 'Poppins-Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    paddingVertical: 5    
  }
})

