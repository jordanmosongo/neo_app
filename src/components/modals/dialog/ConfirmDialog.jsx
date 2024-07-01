import React from 'react';
import { Dialog } from '@rneui/base';
import { Text } from 'react-native';

export const ConfirmDialog = (props) => {
  return (
   <>
   <Dialog
      overlayStyle={{backgroundColor: 'white'}}
      isVisible={props.isVisible}
      onBackdropPress={() => null}
      >
      <Dialog.Title
        titleStyle={{color: '#000',fontFamily: 'Poppins-Regular',}}
        title={props.title}
      />
        <Text style={{color: '#000',fontFamily: 'Poppins-Regular',}}>{props.confirmMessage}</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="Oui"
            onPress={() => props.handleConsent()}
          />
          <Dialog.Button title="Non" onPress={() => props.handleDeny()} />
        </Dialog.Actions>
    </Dialog>
   </>
  )
}