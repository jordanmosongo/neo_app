import { StyleSheet } from 'react-native';
import { BORDERS_WITH_SHADOWS } from '../../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 10,
    position: 'relative',
    padding: 15,
    ...BORDERS_WITH_SHADOWS.CONTACT_CARD
  },
  elementContainer: {
    padding: 5,
    width: '100%',   
    alignItems: 'flex-start'
  },
  elementTitle: {
    fontSize: 14,
    color: '#271d67',
    marginBottom: 2,
    fontWeight: 'bold',
    maxWidth: '95%'
  },
  text: {
    color: '#111'
  }
})

