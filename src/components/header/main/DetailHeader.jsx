import React, { useEffect, useState } from 'react';
import { View, Image, Pressable, SafeAreaView } from 'react-native';
import { Icon } from '@rneui/themed';
import { Badge } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

import { styles } from './MainHeaderStyle';
import { useDispatch, useSelector } from 'react-redux';
import { setNbreOfNotifications, setRefreshHeaderNotifNumber } from '../../../store/userSlice';
import { userServices } from '../../../services/userServices';
import apiUrls from '../../../../apiUrls';
import { COLORS } from '../../../constants/theme';

export const DetailHeader = (props) => {
  const { logoSize, hideNotifIcon, guestId } = props;
  const { nbreOfNotifications, refreshHeaderNotifNumber, tokens, participant_id } = useSelector((state) => state.user);

  const [unreadNotifications, setunreadNotifications] = useState(nbreOfNotifications);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToNofication = () => {
    dispatch(setRefreshHeaderNotifNumber());
    navigation.navigate('NOTIFICATION_SCREEN');
  };

  const updateUnreadNotifications = async (notifications) => {
    let updatedNumber = 0;
    for (const notification of notifications) {
      if (notification.participant_emeteur.id === guestId && notification.type === 'MESSAGE') {
        await userServices.updatStatNotification({ etat: true }, tokens.access, notification.id);
        updatedNumber++;
      }
    }
    return updatedNumber;
  }

  const fetchChatNotifications = async () => {
    try {
      const notifications = await userServices.getNotifications(
        tokens.access
      );
      const unreadNotificationsArr = notifications.filter(({ etat }) => !etat);
      const unreadNotifNbre = unreadNotificationsArr.length;

      const updatedNotifNumber = await updateUnreadNotifications(unreadNotificationsArr);
      const notifNbreToShow = unreadNotifNbre - updatedNotifNumber;

      setunreadNotifications(notifNbreToShow);
      dispatch(setNbreOfNotifications(notifNbreToShow));
    } catch (error) {
      // setError(error);
      console.log('An error occured while updating notifs nbre', error);
    }
  }

  useEffect(() => {
    (async () => await fetchChatNotifications())();
    // Initialize notification
    const socket = new WebSocket(`${apiUrls.baseSocketUrl}/notification/?token=${tokens.access}`);

    socket.onopen = () => {
      console.log('socket is opened to get chat notification');
    }

    socket.onclose = (e) => {
      console.log('socket close from chat notif', e);
    }

    socket.onmessage = async (event) => {
      const receivedNotification = JSON.parse(event.data);
      if (
        receivedNotification.type === 'notification' &&
        receivedNotification.message.participant_recepteur.id === participant_id
      ) {
        if (receivedNotification.message.type === 'MESSAGE' && receivedNotification.message.participant_emeteur.id === guestId) {
          await userServices.updatStatNotification({ etat: true }, tokens.access, receivedNotification.message.id)
        } else {
          const increasedNotifNbre = unreadNotifications + 1;
          setunreadNotifications(increasedNotifNbre);
          dispatch(setNbreOfNotifications(increasedNotifNbre));
        }
      }
    }
  }, [refreshHeaderNotifNumber]);

  return (
    <SafeAreaView style={{
      borderBottomRightRadius: props.bottomRightRadius || 50,
      backgroundColor: COLORS.MAIN_BLUE,
    }}>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{
          paddingHorizontal: 20,
          backgroundColor: COLORS.MAIN_BLUE, // '#271d67',
          borderBottomRightRadius: props.bottomRightRadius || 50
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable onPress={() => {
                dispatch(setRefreshHeaderNotifNumber());
                navigation.navigate('Accueil');
              }}>
                <Image
                  source={require('../../assets/LOGO-NEO.png')}
                  style={{
                    width: logoSize || 70,
                    height: logoSize || 70,
                    marginLeft: -5,
                    resizeMode: "contain"
                  }}
                />
              </Pressable>
            </View>
            {!hideNotifIcon && (
              <View style={styles.notificationContainer}>
                {unreadNotifications > 0 && <Badge style={styles.badge} onPress={navigateToNofication}>
                  {unreadNotifications}
                </Badge>}
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  size={25}
                  color="#fff"
                  onPress={navigateToNofication}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}