import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';

export const RadioButton = (props) => {
    const { theTitle, categories, onPress } = props;
  
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={{
          marginHorizontal: 20,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text}>{theTitle}</Text>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#009af4',
            backgroundColor:
              categories.indexOf(theTitle) !== -1 ? '#009af4' : 'transparent',
            width: 20,
            height: 20,
            alignItems: 'center',
          }}>
          {categories.indexOf(theTitle) !== -1 && (
            <Icon
              name="checkmark-outline"
              type="ionicon"
              size={14}
              color="#fff"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };