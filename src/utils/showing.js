import React from 'react';
import { View } from 'react-native';
import { Icon, ListItem, Text } from '@rneui/themed';

// fixme: do not put component here, move component to appropriate folder
// Component App already declared in App.js, it will create confusions furthers 
export default function App({icon,update=true,title,color,onPress}){
    App.defaultProps={
        icon:'',
        update:false,
        title:"",
        color:"#171a5e"
    }


    return(
        <ListItem activeOpacity={0.9} containerStyle={{padding:5,backgroundColor:'transparent'}} onPress={onPress}>
             <Icon name={icon} type='ionicon' size={15} color={color}/> 
            <View style={{flex:1}}>
                <Text style={{fontFamily:'Poppins-Light',fontSize:15}}>
                    {title}
                </Text>
            </View>
            {
                update==true?(
                    <Icon name='pencil' type='ionicon' size={15} color='#171a5e'/>
                ):null
            }
        </ListItem>
    )
}