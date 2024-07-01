import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Icon } from '@rneui/base';
import { TEXT_SIZES } from '../../../constants/theme';

export const SettingButton = ({ onPress, title }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.container}
      >
        <Text
          style={{
            fontSize: TEXT_SIZES.PARAGRAPH,
            color: '#01bee6',
            fontFamily: 'Poppins-Regular',
          }}>
          {title}
        </Text>
        <Icon
          name="chevron-forward-outline"
          type="ionicon"
          color={'#01bee6'}
          size={18}
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00a7d5',
  },
});