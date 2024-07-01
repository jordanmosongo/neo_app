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
            placeholderTextColor={'#938EB3'}
            onChangeText={(val) => {
              setSearch(val);
              onChangeSearch(val)
            }}
            value={search}
            style={{width: inputWidth ||'85%', height: 40, backgroundColor: COLORS.MAIN_DARK, color: '#A6A6A6',fontFamily: 'Poppins-Regular',}}
            iconColor='#7872A0'
            inputStyle={{
              minHeight: inputHeight,
              maxHeight: inputHeight,
              //fontFamily: FONTS.POPPINS_REGULAR,
            }}
          />
        </>
    )
}