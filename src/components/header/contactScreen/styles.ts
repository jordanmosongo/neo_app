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
      shadowColor: 'transparent',
    },
    image: {
        width: 60,
        height: 60,
        marginLeft: -5
    },
    imageContainer: {
      flexDirection: 'row', 
      alignItems: 'center'     
    },
    text: {
      color: '#fff',
      marginLeft: 20,
      fontSize: 16,
      fontWeight: '400'
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
    }
})