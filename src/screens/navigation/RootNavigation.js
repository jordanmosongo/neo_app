/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Navigation from './navigation';
import Login from '../login';
import Dashboard from '../dashboard';
import ResetPassword from '../../components/forgot';
import {ChatScreen} from '../message/chat/ChatScreen';
import {ChatHeader} from '../../components/header/chat/ChatHeader';
import {NotificationScreen} from '../notification/NotificationScreen';
import EditProfile from '../profil/EditProfile';

import Profil from '../profil/profil';
import {SplashScreen} from '../splash';
import Majournee from '../programme/Majournee';
import Detailprogramme from '../programme/Detailprogramme';
import Participants from '../participants/participants';
import {Stand} from '../stands/stand';
import MesProgrammes from '../programme/MesProgrammes';
import parametres from '../parametres/parametres';
import Contact from '../parametres/contact-nous';
import MentionLegales from '../parametres/mentionsLegales';
import Copyright from '../parametres/copyright';
import Exposants from '../participants/Exposants';
import DetailParticipant from '../participants/DetailParticipant';
import Reglage from '../parametres/Reglage';
import DetailPartenaire from '../participants/DetailPartenaire';
import Badgelecteur from '../badgelecteur/Badgelecteur';
import {ContactInvitationScreen} from '../contact/invitation/ContactInvitationScreen';
import {InvitationScreen} from '../contact/InvitationScreen';
import DetailLogoPartenaire from '../participants/DetailLogoPartenaire';
import { RendezVousScreen } from '../rendezvous/RendezVousScreen';
import { SIZES } from '../../constants/theme';
import { navigationRef } from '../../../OutSideNavigation';
import { AccountDeletionScreen } from '../parametres/AccountDeletion';

const Stack = createStackNavigator();

const RootNavigation = ({route}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mes contacts"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Messages"
          component={Navigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Majournee"
          component={Majournee}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MentionsLegales"
          component={MentionLegales}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="copyrights"
          component={Copyright}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Mesprogrammes"
          component={MesProgrammes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Stand"
          component={Stand}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detailprogramme"
          component={Detailprogramme}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailPartenaire"
          component={DetailPartenaire}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailLogoPartenaire"
          component={DetailLogoPartenaire}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Exposants"
          component={Exposants}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailParticipant"
          component={DetailParticipant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reglage"
          component={Reglage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Participants"
          component={Participants}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
        <Stack.Screen name="parmetres" component={parametres} />
        <Stack.Screen
          name="Forgot"
          component={ResetPassword}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#271d67',
            },
            headerTitle: 'Modifiez votre mot de passe',
            headerTitleStyle: {
              color: '#fff',
              textAlign: 'center',
              fontSize: 17,
            },
          }}
        />
        <Stack.Screen
          name="CHAT_SCREEN"
          component={ChatScreen}
          options={({route: {params}}) => ({
            headerShown: false,
            headerStyle: {
              backgroundColor: '#271d67',
            },
            headerTitle: props => <ChatHeader user={params.user} {...props} />,
            headerTintColor: '#fff',
            headerTitleStyle: {
              backgroundColor: '#271d67',
              textAlign: 'center',
              fontSize: SIZES.medium,
            },
          })}
        />
        <Stack.Screen
          name="NOTIFICATION_SCREEN"
          component={NotificationScreen}
          options={{
            headerShown: false,
            headerTitle: 'Notifications',
            headerTitleStyle: {
              color: '#111',
              textAlign: 'center',
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="Badgelecteur"
          component={Badgelecteur}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#271d67',
            },
            headerTintColor: 'white',
            headerTitle: 'Short link QR',
            headerTitleStyle: {
              color: '#fff',
              textAlign: 'center',
              fontSize: 17,
            },
          }}
        />
        <Stack.Screen
          name="INVITATIONS"
          component={InvitationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RENDEZ_VOUS"
          component={RendezVousScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="CLOSE_ACCOUNT"
          component={AccountDeletionScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
