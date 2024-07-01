import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingVertical: 10,
    position: 'relative',

    padding: 15,
    borderRadius: 50,

    shadowColor: '#281D67',
    elevation: 6,
    backgroundColor: '#fff',
    borderColor: '#B7B3CC',
    borderWidth: 2,
  },
  elementContainer: {
    flexDirection: 'row',
    paddingBottom: 4,
    width: '85%',
    paddingRight: 4
  },
  elementTitle: {
    fontSize: 16,
    color: '#271d67',
    marginBottom: 2,
    fontWeight: 'bold',
    maxWidth: '100%',
    fontFamily: 'Poppins-Regular',
  },
  text: {
    color: '#111',
    fontFamily: 'Poppins-Regular',  
  }
})

