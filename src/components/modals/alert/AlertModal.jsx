import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';

import { styles } from './styles';
import { globalStyles } from '../../../constants/styles';
import { COLORS } from '../../../constants/theme';

export const AlertModal = (props) => {
    return (
      <>
        <Modal 
         isVisible={props.isAlertVisible}       
        >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{
              padding: 20,
              backgroundColor: '#271d67',
              borderTopEndRadius: 5,
              borderTopStartRadius: 5
            }}>
             <Text style={{
              //...styles.title,
              ...globalStyles.secondLevelTitle,
              color: COLORS.WHITE
             }}>{props.title}</Text>
            </View>
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 5
            }}>
             <Text style={styles.text}>{props.confirmMessage}</Text>
            </View>
            
            <View style={styles.actions}>
              <Button 
                style={styles.button} 
                loading={props.loading} 
                icon={''} 
                mode='contained'
                onPress={() => props.closeAlert()}
                > {props.isStatusError ? 'Réessayer' : 'Ok'} </Button> 
              {props.isStatusError && (
                <Button
                 style={{...styles.button, backgroundColor: COLORS.MAIN_RED}} 
                loading={props.loading} 
                icon={''} 
                mode='contained'
                onPress={() => props.abortErrorAction()}
                >Annuler</Button>
              )}            
            </View>
          </View>
        </View>
      </Modal>
      </>
    )
}

