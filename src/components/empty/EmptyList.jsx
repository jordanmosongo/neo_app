import React from 'react';
import {View, Text} from 'react-native';
import { EmptyListStyle } from './EmptyListStyle';
import Icon from 'react-native-vector-icons/Fontisto';


export const EmptyListComponent = (props) => {
    return (
        <>
        <View style={EmptyListStyle.container} >
          {!props.hideIcon && <Icon
            name='dropbox'
            color= "#938EB3"
            size={50}
          /> }       
          <Text style={EmptyListStyle.text}>
            {props.message}
          </Text>
        </View>
       </>
    )
}