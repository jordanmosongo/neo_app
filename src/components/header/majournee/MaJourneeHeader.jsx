import React from 'react';
import {View, Text, Pressable} from 'react-native';

import {Avatar} from '@rneui/base';

import { Allheader } from '../main/allheader';
import { useNavigation } from '@react-navigation/native';

export const MaJourneeHeader = () => {

  const navigation = useNavigation()

  return (
    <>
     <View
        borderBottomRightRadius={70}
        style={{
          backgroundColor: '#271d67',
          borderBottomRightRadius: 90,
          padding: 12,
          height: 170,
        }}>
        <View
          style={{
            height: 30,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Allheader />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignContent: 'center',
            alignItems: 'center',top:20
          }}>
          <Text
            style={{
              color: '#ffff',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Bold',
            }}>
            Ma journée
          </Text>
          <View style={{left: 5, backgroundColor: '#ff6600', borderRadius: 30}}>
            <Avatar
              size={60}
              rounded
              source={require('../../../components/assets/PICTO__JOURNEE.png')}
            />
          </View>
          
        </View>
        <Pressable onPress={() => navigation.goBack()} style={{top:-10}}>
          <Text style={{color: '#271d67', fontWeight: 'bold', marginBottom: 5,fontFamily: 'Poppins-Regular',}}>
            
          </Text>
          <View
            style={{
              backgroundColor: '#fff',
              width: 20,
              height: 20,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',left:7
            }}>
            <Text style={{color: '#271d67',fontWeight:'bold',fontSize:15,fontFamily: 'Poppins-Regular',}}>{'<'}</Text>
          </View>
        </Pressable>
      </View>
    </>
  )
}