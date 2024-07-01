import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { Button, ActivityIndicator } from 'react-native-paper';

import { styles } from './styles';
import { globalStyles } from '../../../constants/styles';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';

export const AlertScanModal = (props) => {
    return (
      <>
        <Modal 
         isVisible={props.isAlertVisible}       
        >
        <View style={styles.wrapper}>
          <View style={styles.container}>
           {!props.isLoading && <View style={{
              padding: 20,
              backgroundColor: '#271d67',
              borderTopEndRadius: 5,
              borderTopStartRadius: 5
            }}>
             <Text style={{
                ...globalStyles.secondLevelTitle,
              color: COLORS.WHITE
             }}>{props.title}</Text>
            </View>}
            <View style={{
              paddingHorizontal: 20,
              paddingTop: 5
            }}>

             { props.isLoading ? (
              <>
               <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  backgroundColor: '#fff',
                  marginVertical: 20
                }}>
                <ActivityIndicator size={30} color='#271d67' />
                <Text style={{
                  color: COLORS.BLACK,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: SIZES.font,
                  marginLeft: 20
                }}>Veuillez patienter</Text>
              </View>
              </>) : <Text style={styles.text}>{props.confirmMessage}</Text>}            
            </View>
            
            {!props.isLoading && <View style={styles.actions}>
              <Button 
                style={styles.button} 
                loading={props.loading} 
                icon={''} 
                mode='contained'
                onPress={() => props.closeAlert()}
                >
                  {props.isFailedRequest ? 'Réessayer' : 'Ok'}
                </Button>             
            </View>}
          </View>
        </View>
      </Modal>
      </>
    )
}

