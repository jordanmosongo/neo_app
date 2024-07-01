import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import { ContactListScreen } from './list/ContactListScreen';

const Tab = createMaterialTopTabNavigator();

export const ContactScreen = () => {
   return (
    <>
      <ContactListScreen/>
    </>
   )
}