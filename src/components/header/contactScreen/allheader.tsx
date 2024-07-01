import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Icon} from '@rneui/themed';
import {Badge} from 'react-native-paper';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import { useFetchUnreadNotifications } from '../../../hooks/useFetchUnreadNotification';

export const Allheader = (props: {width: any; height: any}) => {
  const navigation = useNavigation();
  useFetchUnreadNotifications();
  // @ts-ignore
  const {nbreOfNotifications} = useSelector(state => state.user);

  const navigateToNofication = () => {
    navigation.dispatch(StackActions.push('NOTIFICATION_SCREEN'));
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/LOGO-NEO.png')}
            style={{
              ...styles.image,
              width: props.width || 70,
              height: props.height || 60,
            }}
          />
        </View>
        <View style={styles.messageContainer}></View>
        <View
          style={{
            ...styles.notificationContainer,
          }}>
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

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 30,
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
    marginLeft: -5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  messageContainer: {
    // backgroundColor: '#281D67',
    paddingHorizontal: 20,
    paddingVertical: 8,
    width: '70%',
    borderRadius: 50,
  },
  notificationContainer: {
    position: 'relative',
  },
  messageText: {
    color: '#625d57',
    fontFamily: 'Poppins-Regular',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -7,
    zIndex: 2,
  },
});
