import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import React from 'react';

// fixme: do not put component here, move component to appropriate folder
const Header =()=> {

    return ( 
        <View style={styles.header_home}>  
            <Text>Logo</Text>
            <Text>Notifixcation</Text>
        </View>
     );
}
const styles = StyleSheet.create({
    header_home: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection:'row',
        justifyContent:'space-between',
        height:50
        
      },
})

export default Header;