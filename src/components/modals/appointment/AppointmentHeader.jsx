import React from "react";
import {View, Text, Image} from 'react-native';

export const AppointmentHeader = () => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',                
              }}>
                <Image
                source={require('../../assets/LOGO-NEO.png')}
                style={styles.image}
                />
                <Text style={{color: '#fff', fontSize: 16, marginLeft: 10,fontFamily: 'Poppins-Regular',}}>Rendez-vous</Text>
                </View>
                <View style={styles.notificationContainer}>
                <Badge style={styles.badge} onPress={navigateToNofication}>
                    {notif.length}
                </Badge>
                <Icon
                    name="notifications-outline"
                    type="ionicon"
                    size={25}
                    color="#fff"
                    onPress={navigateToNofication}
                />
                </View>
               </View>
    )
}