import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -20,
    left: -20,
    bottom: -20,
    right: -20,
  },
  modalHeaderContainer: {      
    margin: 20,
    borderBottomColor: "#cceef7",
    borderBottomWidth: 1,
    marginTop: 60,
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
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    color: 'black',fontFamily: 'Poppins-Regular',
  },
  buttons: {
    flexDirection: 'row',
     marginVertical: 10,
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
    borderRadius: 10,
    borderColor: '#888888',
    justifyContent: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10
  }
});