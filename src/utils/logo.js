import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import React from 'react';

// fixme: do not put component here, move component to appropriate folder
const Logo =()=> {

    return ( 
        <View style={styles.logp}>
            <Text>LOGO NEO</Text>
        </View>
     );
}
const styles = StyleSheet.create({
    logp: {
        flex: 1,
        backgroundColor: 'red',
        width:'30%',height:'20%'
        
      },
})

export default Logo;