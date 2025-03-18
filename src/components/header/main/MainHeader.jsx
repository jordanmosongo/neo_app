import React, { useState, useEffect } from 'react';
import { View, Image, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import { Badge } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './MainHeaderStyle';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { setNbreOfNotifications, setRefreshHeaderNotifNumber, setSelectedEvenementId } from '../../../store/userSlice';
import { userServices } from '../../../services/userServices';
import apiUrls from '../../../../apiUrls';

export const MainHeader = (props) => {
  const { withTitle, title, logoSize, noBackAction, noClickOnLogo } = props;

  const { selectedEvenementId, nbreOfNotifications, tokens, participant_id, refreshHeaderNotifNumber } = useSelector(state => state.user);
  const [unreadNotifications, setUnreadNotifications] = useState(nbreOfNotifications);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToNofication = () => {
    navigation.navigate('NOTIFICATION_SCREEN');
  };

  const GetAvatar = () => {
    switch (props.imageNameFor) {
      case 'PARTICIPANTS':
        return (
          <Image
          source={require('../../../components/assets/CLIENTS.png')}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60
          }}
        />
        )
      case 'EXPOSANTS':
        return (
          <Image
          source={require('../../../components/assets/PICTO__PARTENAIRES_ROND.png')}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60
          }}
        />
        )
      case 'PROGRAMME':
        return (
          <Image
            source={require('../../../components/assets/PICTO__PROGRAMME_ROND.png')}
            resizeMode="contain"
            style={{
              width: 60,
              height: 60
            }}
          />
        )

      case 'MAJOURNEE':
        return (
          <Image
          source={require('../../../components/assets/PICTO__JOURNEE_ROND.png')}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60
          }}
        />
        )

      case 'MESSAGE':
        return (
          <Image
          source={require('../../../components/assets/PICTO__MESSAGE_ROND_WEB.png')}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60
          }}
        />
        )
        case 'STAND':
        return (
          <Image
          source={require('../../../components/assets/STAND_ROND.png')}
          resizeMode="contain"
          style={{
            width: 60,
            height: 60
          }}
        />
        )
      default:
        break;
    }
  }

  function handle() {
    if (noClickOnLogo) {
      return navigation.navigate('Login');
    }
    if (selectedEvenementId === '') {
      navigation.navigate('Dashboard');
    } else {
      if (props.redirectToDashboard) {
        dispatch(setSelectedEvenementId(''));
        dispatch(setRefreshHeaderNotifNumber());
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Accueill');
      }
    }
  }

  const fetchUnReadNotifications = async () => {
    try {
      const notifications = await userServices.getNotifications(
        tokens.access
      );
      const nbre = [...notifications.filter(({ etat }) => !etat)].length;
      setUnreadNotifications(nbre);
      dispatch(setNbreOfNotifications(nbre));

    } catch (error) {
      console.log('error on fetch notofocations !');
    }
  }

  useEffect(() => {
    (async () => await fetchUnReadNotifications())();

    const socket = new WebSocket(`${apiUrls.baseSocketUrl}/notification/?token=${tokens.access}`);

    socket.onopen = () => {
      console.log('socket is opened to get notification');
    }
    socket.onclose = (e) => {
      console.log('socket is closed', e);
    }
    socket.onmessage = (event) => {
      const receivedNotification = JSON.parse(event.data);
      if (
        receivedNotification.type === 'notification' &&
        receivedNotification.message.participant_recepteur.id === participant_id
      ) {
        const updatedNumber = unreadNotifications + 1;
        setUnreadNotifications(updatedNumber);
        dispatch(setNbreOfNotifications(updatedNumber));
      }
    }

  }, [refreshHeaderNotifNumber]);

  return (
    <SafeAreaView style={{
      borderBottomRightRadius: props.noRadius ? 0 : props.bottomRightRadius || 50,
      backgroundColor: COLORS.MAIN_BLUE,
    }}>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{
          paddingHorizontal: 20,
          backgroundColor: COLORS.MAIN_BLUE, //'#271d67',
          borderBottomRightRadius: props.noRadius ? 0 : props.bottomRightRadius || 50
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
              <TouchableOpacity onPress={() => {
                dispatch(setRefreshHeaderNotifNumber());
                handle();
              }}>
                <Image
                  source={require('../../assets/LOGO-NEO.png')}
                  style={{
                    width: logoSize || 70,
                    height: logoSize || 70,
                    marginLeft: -5,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            {!props.hideNotifIcon && (
              <TouchableOpacity
                style={styles.notificationContainer}
                onPress={() => {
                  dispatch(setRefreshHeaderNotifNumber());
                  navigateToNofication();
                }}
              >
                {unreadNotifications > 0 && <Badge style={styles.badge}>
                  {unreadNotifications}
                </Badge>}
                <Icon
                  name="bell"
                  type='feather'
                  size={25}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
          {withTitle &&
            <View style={{
              marginBottom: 30,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <View
              // onPress={() => navigation.goBack()}
              >
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: COLORS.WHITE,
                    fontFamily: FONTS.POPPINS_BOLD,
                    fontSize: SIZES.large,
                  }}
                  >{title}</Text>

                  {props.withNumber &&
                    <View style={{
                      backgroundColor: '#fff',
                      width: 40,
                      height: 40,
                      borderRadius: 100,
                      marginLeft: 10,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <Text style={{ color: '#271d67', fontSize: 20, fontWeight: 'bold', fontFamily: 'Poppins-Regular', }}>{props.number}</Text>
                    </View>
                  }
                </View>
              </View>
              {props.withImage && <View
                style={{ 
                  backgroundColor: props.pictoBgColor || '#009af4', 
                  borderRadius: 30,
               }}>
                <GetAvatar />
              </View>}
            </View>}
          <View style={{ justifyContent: 'flex-start' }}>
            {!noBackAction && <TouchableOpacity onPress={() => {
              dispatch(setRefreshHeaderNotifNumber());
              navigation.goBack();
            }}>
              <View style={{
                backgroundColor: '#fff',
                width: 25,
                height: 25,
                borderRadius: 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                top: props.marginTop || -35
              }}>
                <Icon
                  name="notifications-outline"
                  type="ionicon"
                  size={25}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}