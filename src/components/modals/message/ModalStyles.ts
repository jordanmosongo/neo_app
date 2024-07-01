import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: -20,
    left: -20,
    bottom: -20,
    right: -20
  },
  modalHeaderContainer: {      
    padding: 20,
    borderBottomColor: "#e2dede",
    borderBottomWidth: 1,
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
    color: '#fff',fontFamily: 'Poppins-Regular',
  } 
});