import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';

import { setConfigData, setSelectedEvenementId, setSelectedEvent } from '../store/userSlice';
import { Badge } from 'react-native-paper';
import { AlertModal } from '../components/modals/alert/AlertModal';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import axios from 'axios';
import apiUrls from '../../apiUrls';
import { useFetchUnreadNotifications } from '../hooks/useFetchUnreadNotification';
import { userServices } from '../services/userServices';
import { MaiLoaderComponent } from '../components/loaders/MainLoader';

const { width } = Dimensions.get('window');

const CustomBottomTabItem1 = (props) => {
  const { navigation, target, icon, text, notVisible = false, selectedEvenementId } = props;
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  const dispatch = useDispatch();

  function handle() {
    if (props.isChoiceNeeded) {
      navigation.navigate('Dashboard');
      return null;
    }
    if (selectedEvenementId === '') {
      dispatch(setSelectedEvenementId(''));
      navigation.navigate('Dashboard');
    } else {
      navigation.navigate('Home', { screen: target })
    }
  }

  return (
    <>
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
        }} />

      <TouchableOpacity
        disabled={notVisible}
        style={{ alignItems: 'center', opacity: notVisible }}
        onPress={() => {
          handle()
        }}>
        {/* <Image source={icon} style={{ width: 25, height: 25 }} /> */}
        <Icon
          name={icon.name}
          size={20}
          type={icon.type}
          color={"#fff"}
        />
        <Text style={{
          fontSize: SIZES.base,
          color: COLORS.WHITE,
          marginBottom: 4,
          fontFamily: FONTS.POPPINS_REGULAR
        }}>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const Dashboard = () => {
  const [evenements, setEvenements] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { unreadNotifications } = useFetchUnreadNotifications();
  const { selectedEvenementId, playerId, tokens, refreshHeaderNotifNumber } = useSelector(state => state.user);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const route = useRoute();

  const navigateToNofication = () => {
    navigation.dispatch(StackActions.push('NOTIFICATION_SCREEN'));
  };

  const fetchEvents = async () => {
    try {
      setIsRefreshing(true);
      const { data } = await axios.get(apiUrls.baseEvent, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      setEvenements(data);
      setHasLoaded(true);
      setIsRefreshing(false);
    } catch (error) {
      console.log('error on fetch events', error);
    }
  }

  const saveDevicePlayerId = async () => {
    try {
      if (playerId) {
        await axios.post(apiUrls.pushNotificationBase, {
          typeapp: Platform.OS,
          token: playerId
        }, { headers: { Authorization: `JWT ${tokens.access}` } });
      }
    } catch (error) {
      console.log('error on save player id', error);
    }
  }

  const fetchConfig = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.pageConfigurationBase}`);
      dispatch(setConfigData(data));
    } catch (error) {
      console.log('error on fetch configurations', error);
    }
  }


  useEffect(() => {
    (async () => {
      await fetchEvents();
      await fetchConfig();
      await saveDevicePlayerId();
    })();
  }, [refreshHeaderNotifNumber]);   // nbreOfNotifications

  return (
    <>
      <View style={styles.backgroundImage}>
        {Platform.OS === 'ios' && <View style={{ height: 40 }} />}
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={navigateToNofication}
            style={{
              marginRight: 10,
              marginTop: 5,
            }}>
            {unreadNotifications > 0 && <Badge style={styles.badge}>{unreadNotifications}</Badge>}
            <Icon
              name="notifications-outline"
              type="ionicon"
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../components/assets/NEO_BULL.png')}
            style={{
              width: 300,
              height: 150,
              resizeMode: "contain"
            }}
          />
        </View>
        {hasLoaded ? <>
          <View style={{
            alignItems: 'center',
            margin: 30,
            marginTop: 0
          }}>
            {/* <Text style={styles.txt}>Choisissez votre événement</Text> */}
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl
              refreshing={isRefreshing}
              onRefresh={async () => {
                await fetchEvents();
              }}
            />}>
            <View style={styles.panel}>
              {evenements.map((even, index) => {
                return (
                  <View style={styles.view_panels} key={index}>
                    <TouchableOpacity
                      key={`evenement-${index}`}
                      onPress={() => {
                        dispatch(setSelectedEvenementId(even.id));
                        dispatch(setSelectedEvent(even));
                        navigation.navigate('Home');
                      }}>
                      <Image
                        source={{ uri: `${even.photo}` }}
                        style={{
                          width: 220,
                          height: 120,
                          marginBottom: 10,
                          marginTop: 10,
                          borderRadius: 20,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </> : <MaiLoaderComponent backColor={COLORS.MAIN_BLUE} color="#fff" />}
      </View>
      <View
        style={{
          backgroundColor: COLORS.MAIN_BLUE, // '#281D68',
          position: 'absolute',
          flexDirection: 'row',
          padding: 5,
          paddingBottom: Platform.OS === 'android' ? 5 : 20,
          width: '100%',
          justifyContent: 'space-around',
          bottom: 0,
        }}>
        <CustomBottomTabItem1
          selectedEvenementId={selectedEvenementId}
          navigation={navigation}
          isChoiceNeeded={true}
          icon={{
            name: 'home-outline',
            type: 'ionicon'
          }}
          text="Accueil"
        />

        <CustomBottomTabItem1
          navigation={navigation}
          target="Messages"
          icon={{
            name: 'mail-outline',
            type: 'ionicon'
          }}
          text="Messages"
        />
        <CustomBottomTabItem1
          navigation={navigation}
          target="contacts"
          icon={{
            name: 'people-outline',
            type: 'ionicon'
          }}
          text="Mes contacts"
        />

        <CustomBottomTabItem1
          navigation={navigation}
          target="Mon compte"
          icon={{
            name: 'person-outline',
            type: 'ionicon'
          }}
          text="Mon compte"
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: COLORS.MAIN_BLUE, // '#1E1760',
    flex: 1,
  },
  txt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    fontFamily: FONTS.POPPINS_REGULAR,

  },
  txt1: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'grey',
    textAlign: 'center',
    alignItems: 'center',
    fontFamily: FONTS.POPPINS_REGULAR,
  },
  icon: {
    margin: 10,
    alignItems: 'flex-end',
  },
  logo: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
  },
  view_panels: {
    backgroundColor: '#d2e9fb',
    borderRadius: 30,
    marginBottom: 15,
    alignItems: 'center',
    paddingHorizontal: width >= 600 ? 80 : 20,
    paddingVertical: width >= 600 ? 20 : 10,
  },
  panel: {
    margin: 60,
    marginBottom: 50,
    marginTop: 0,
    flex: 1,
    alignItems: 'center'
  },
  messageText: {
    color: '#625d57',
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -7,
    zIndex: 2,
  },
});
export default Dashboard;
