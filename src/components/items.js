import React, { useState } from 'react';
import { FlatList, View ,Text, StyleSheet} from 'react-native';


 const Item = ({item}) => {
    return(
    <View style={styles.item}>
    <Text style={{color: 'black'}}>{name}</Text>
    </View>
    );
    }
    const styles = StyleSheet.create({
        container: {
        marginTop:30,
        padding:2,
        },
        item: {
        backgroundColor: 'orange',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        },
        });
    export default Item