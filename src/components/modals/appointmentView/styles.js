import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    // padding: 20,
    borderRadius: 5,
  },
  title: {
    color: '#111',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,fontFamily: 'Poppins-Regular',
  },
  text: {
    color: '#111',
    paddingBottom: 3,
    lineHeight: 22
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 20,
    marginTop: 0
  },
  button: {
    marginLeft: 5,
    fontFamily: 'Poppins-Regular',
  }
});