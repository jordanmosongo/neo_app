import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,      
      backgroundColor: '#271d67',
      borderBottomRightRadius: 50
    },
    image: {
        width: 70,
        height: 70,
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
    }
})