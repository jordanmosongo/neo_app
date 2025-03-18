import React, { useState } from 'react';
import {Searchbar} from 'react-native-paper';
import { COLORS, FONTS } from '../../../constants/theme';

export const SearchInput = (props) => {
    const {onChangeSearch, placeholder, inputHeight, inputWidth} = props;
    const [search, setSearch] = useState('');

    return (
        <>
          <Searchbar
            placeholder={placeholder}
            placeholderTextColor={'#7F93B9'}
            onChangeText={(val) => {
              setSearch(val);
              onChangeSearch(val)
            }}
            value={search}
            style={{width: inputWidth ||'85%', height: 40, backgroundColor: COLORS.MAIN_DARK, color: '#A6A6A6',fontFamily: 'Poppins-Regular',}}
            iconColor='#73738C'
            inputStyle={{
              minHeight: inputHeight,
              maxHeight: inputHeight,
              fontFamily: FONTS.POPPINS_REGULAR,
              fontSize: 16,
            }}
          />
        </>
    )
}