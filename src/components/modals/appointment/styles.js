import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 5
  },
  modalHeaderContainer: {      
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomColor: "#cceef7",
    borderBottomWidth: 1,
    backgroundColor: "#271d67",
  },
  selectedContactContainer: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#271d67',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedContactText: {
    fontSize: 15,
    color: '#fff'
  }, 

  // appointment header styles

  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: 2,
    top: -1,
    backgroundColor: '#271d67',
    borderBottomRightRadius: 50
  },
  image: {
      width: 60,
      height: 60,
      marginLeft: -5
  },
  messageContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 6,
    width: '70%',
    borderRadius: 50
  },
  notificationContainer: {
    position: 'relative',
    
  },
  messageText: {
    color: '#625d57'
  },
  badge: {
      position: 'absolute',
      top: -10,
      right: -7,
      zIndex: 2
  },
  // form elements

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  label: {
    color: 'black',
    marginVertical: 10
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PARAGRAPH
  },
  buttons: {
    flexDirection: 'row',
     marginVertical: 10,
     justifyContent: 'flex-end'
  },
  description: {
    width: 300,
    height: 400,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeViewContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  timeView: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#888888',
    justifyContent: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10
  }
});