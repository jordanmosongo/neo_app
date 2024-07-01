import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      left: -15,      
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
      position: 'relative'
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
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 50,
      padding: 10,
      marginVertical: 5,
      color: 'black',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    description: {
      width: 300,
      height: 400,
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    }
})