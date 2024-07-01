import React from 'react';
import { View } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

export const MaiLoaderComponent = (props) => {
    return (
      <>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: props.backColor || '#fff'}}>
          <ActivityIndicator size={40} color={props.color || '#271d67'} />
       </View>
      </>
    )
}