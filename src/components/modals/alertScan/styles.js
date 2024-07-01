import {StyleSheet} from 'react-native';
import { COLORS } from '../../../constants/theme';

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
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  text: {
    color: '#111',
    paddingVertical: 10,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Poppins-Regular',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: 5,
    backgroundColor: COLORS.GRAY,
    fontFamily: 'Poppins-Regular',
  },
});
