import React from "react";
import { View, Text } from 'react-native';

import {Icon} from 'react-native-elements';
import { InputToolbar, Composer } from 'react-native-gifted-chat';

export const RenderInputToolbar = (props) => {
    return (
      <>
       <InputToolbar {...props}          
        containerStyle={{
          paddingVertical: 5,
          paddingLeft: 10           
        }} 
        renderActions={() => {
          return (
            <>
             <View style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10
             }}>
              <Icon name="calendar"
                  type="ionicon"
                  size={20}
                  color="#271d67"
                  onPress={() => props.handleInputAction()}
                />
                <Text style={{
                  color: '#111',
                  fontSize: 8,fontFamily: 'Poppins-Regular',
                }}>Rendez-vous</Text>
              </View>
            </>
          )
        }} 
        renderComposer={(props) => {
          return (
            <Composer {...props}
             textInputStyle={{
              borderColor: '#465199',
              borderWidth: 1,
              color: '#465199',
              paddingHorizontal: 10,
              borderRadius: 50
             }}
            />
          )
        }}        
       />
      </>
    )
  }