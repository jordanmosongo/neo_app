import { StackActions, useNavigation } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, Image, StyleSheet,StatusBar } from 'react-native';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { connect, useDispatch, useSelector } from 'react-redux';
import UserHelper from '../helpers/UserHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { setUserConnected } from '../store/userSlice';
import { COLORS, FONTS } from '../constants/theme';

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

export function SplashScreen(){

    const user = useSelector(state => state.user);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    React.useEffect(()=>{
        setTimeout(async()=>{
            await init();
        },2000);
    },[])


    async function init(){
        const  Storagedata = await AsyncStorage.getItem('@USER');
        const parsedStoragedata = JSON.parse(Storagedata);

        if(!UserHelper.isConnected(parsedStoragedata) ){
            return navigation.dispatch(
                StackActions.replace('Login')
            )
        }
        /* return navigation.dispatch(
            StackActions.replace('Login')
        ) */
        const {access, refresh} = parsedStoragedata;
        const {participant_id, exp} = jwt_decode(access);

        dispatch(
            setUserConnected({
              access,
              refresh,
              participant_id,
            }),
          );

        return  navigation.dispatch(
            StackActions.replace('Dashboard')
        )
    }

    return (
        <React.Fragment>
            <StatusBar hidden />
            <View style={styles.container}>
                <Image
                    source={require('../components/assets/LOGO-NEO.png')}
                    style={{width:150,height:150}}
                />
            </View>
        </React.Fragment>
    )
}