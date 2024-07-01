import React from 'react';

import SelectDropdown from 'react-native-select-dropdown';
import { Icon } from '@rneui/themed';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';

export const SelectDropdownComponent = (props) => {
  const { items, defaultButtonText, onSelectItem, keyToShow } = props;
  return (
    <>
      <SelectDropdown
        disabled={props.disabled}
        data={items}
        defaultButtonText={defaultButtonText}
        buttonStyle={{
          borderWidth: 1,
          borderColor: '#888888',
          width: '100%',
          backgroundColor: '#fff',
          borderRadius: 5,
          marginVertical: 5,
        }}
        buttonTextStyle={{
          fontSize: TEXT_SIZES.PARAGRAPH,
          color: props.disabled ? COLORS.GRAY : COLORS.MAIN_BLUE,
          fontFamily: FONTS.POPPINS_REGULAR,
          position: 'absolute',
          right: 0,
          maxWidth: 200
        }}
        rowTextStyle={{
          fontFamily: FONTS.POPPINS_REGULAR,
          color: COLORS.MAIN_BLUE,
          fontSize: TEXT_SIZES.PARAGRAPH
        }}
        onSelect={(selectedItem) => onSelectItem(selectedItem)}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem[keyToShow]
        }}
        rowTextForSelection={(item, index) => {
          return item[keyToShow]
        }}
        renderDropdownIcon={(isOpened) => {
          return <Icon
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            type="ionicon"
            size={TEXT_SIZES.PARAGRAPH}
            color={COLORS.MAIN_BLUE}
          />
        }}
        dropdownIconPosition={'right'}
      />
    </>
  )
}