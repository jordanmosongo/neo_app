import React from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {Icon} from '@rneui/themed';
import {styles} from './styles';
import {Badge} from 'react-native-paper';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const AppointmentHeader = (props) => {
  // @ts-ignore
  const {nbreOfNotifications} = useSelector(state => state.user);
  const navigation = useNavigation();
  const navigateToNofication = () => {
    navigation.dispatch(StackActions.push('NOTIFICATION_SCREEN'));
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image
          source={require('../../assets/LOGO-NEO.png')}
          style={styles.image}
        />
        <Text style={{
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 10 ,fontFamily: 'Poppins-Regular',        
        }}>{props.message || 'Messages'}</Text>
        </View>
        <View style={styles.notificationContainer}>
          <Badge style={styles.badge} onPress={navigateToNofication}>
            {nbreOfNotifications}
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
    </>
  );
};
