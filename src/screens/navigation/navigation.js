/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import Home from '../home';
import MessageScreen from '../message/MessageScreen';
import {MessageScreenHeader} from '../../components/header/messageScreen/MessageScreenHeader';
import {ContactScreenHeader} from '../../components/header/contactScreen/contactScreenHeader';
import {ContactScreen} from '../contact/ContactScreen';

import {Badge} from 'react-native-paper';
import Profil from '../profil/profil';
import parametres from '../parametres/parametres';
import Settings from '../parametres/Settings';
import {white} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import { Allheader } from '../../components/header/contactScreen/allheader';

import {useSelector, useDispatch} from 'react-redux';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
// Todo: rename this file to bottom Tabs
const HomeScreen = () => {

 const {selectedEvenementId} = useSelector(state => state.user);

 const navigation = useNavigation();
 // const route = useRoute();

  if (selectedEvenementId === '') {
    navigation.navigate('Dashboard');
  } else {
    return <Home />
  }
};

const Tab = createBottomTabNavigator();

const Navigation = ({navigation}) => {

  return (
    <Tab.Navigator
      
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#00A7D5',
        tabBarInactiveTintColor: '#D8D8D8',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: true,
        tabBarStyle: {
          backgroundColor: COLORS.MAIN_BLUE,
        },
      }}
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          borderColor: 'red',
          left: 20,
          right: 20,
          fontFamily: 'Poppins-Regular',
          elevation: 0,
          borderRaduis: 15,
          height: 90,
          ...styles.shadow,
        },
        tabBarSelectedItemStyle: {
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
          fontFamily: 'Poppins-Regular'
        },
      }}>
      <Tab.Screen
        name="Accueill"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#271d67',
          },
          tabBarLabelStyle: {
            fontSize: SIZES.base,
            fontFamily: FONTS.POPPINS_REGULAR,
            marginBottom: 2,
          },
          tabBarIcon: ({focused, color}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Dashboard'}],
                });
              }}>
              <Icon name="home-outline" size={20} type="ionicon" color={color} />
            </TouchableOpacity>
          ),
          headerTitle: props => <Allheader {...props} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessageScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#271d67',
            borderBottomRightRadius: 50,
          },
          tabBarLabelStyle: {
            fontSize: SIZES.base,
            fontFamily: FONTS.POPPINS_REGULAR,
            marginBottom: 2,
          },
          tabBarIcon: ({focused, color}) => (
            <Icon
              name="mail-outline"
              size={20}
              type="ionicon"
              color={color}
            />
          ),
          headerTitle: props => <MessageScreenHeader {...props} />,
        }}
      />
      <Tab.Screen
        name="contacts"
        component={ContactScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#271d67',
            shadowColor: 'transparent',
          },
          tabBarLabel: 'Mes contacts',
          tabBarLabelStyle: {
            fontSize: SIZES.base,
            fontFamily: FONTS.POPPINS_REGULAR,
            marginBottom: 2,
          },
          tabBarIcon: ({focused, color}) => (
            <Icon name="people-outline" size={20} type="ionicon" color={color} />
          ),
          headerTitleStyle: {shadowColor: 'transparent'},
          headerTitle: props => <ContactScreenHeader {...props} />,
        }}
      />
      <Tab.Screen
        name="Mon compte"
        component={Settings}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#271d67',
          },
          tabBarLabelStyle: {
            fontSize: SIZES.base,
            fontFamily: FONTS.POPPINS_REGULAR,
            marginBottom: 2,
          },
          tabBarIcon: ({focused, color}) => (
            <Icon name="person-outline" size={20} type="ionicon" color={color} />
          ),
          headerTitle: props => <Allheader {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
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
  },
  messageContainer: {
    backgroundColor: '#281D67',
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
  },
  badge: {
    position: 'absolute',
    top: -10,
    right: -7,
    zIndex: 2,
  },
});

export default Navigation;
