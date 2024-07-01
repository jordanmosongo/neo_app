import React from 'react';
import { View, Text } from 'react-native';

import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';

import { styles } from './styles';

export const AppointmentViewModal = (props) => {
  return (
    <>
      <Modal
        isVisible={props.isVisible}
      >
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View style={{
               padding: 20,
               backgroundColor: '#271d67',
               borderTopEndRadius: 5,
               borderTopStartRadius: 5
            }}>
              <Text style={{...styles.title, color: '#fff'}}>Information</Text>
            </View>
            <View style={{
               padding: 20,
            }}>
             <Text style={{...styles.title, color: '#111'}}>{props.title}</Text>
            </View>
            <View style={styles.actions}>
              {
                props.isEmitor ? <>
                  <Button
                    style={{...styles.button, backgroundColor: 'gray'}}
                    icon={''}
                    mode='contained'
                    onPress={() => props.closeModal()}
                  >Fermer</Button>
                </>
                  : <>
                    {!props.isDenying && <Button
                      style={{...styles.button, backgroundColor: '#00a7d5'}}
                      loading={props.isAccepting}
                      icon={''}
                      mode='contained'
                      onPress={() => props.handleConsent()}
                    >{!props.isAccepting ? 'Accepter' : 'Patienter...'}</Button>}

                    {!props.isAccepting && <Button
                      loading={props.isDenying}
                      style={{...styles.button, backgroundColor: 'gray'}}
                      icon={''}
                      mode='contained'
                      onPress={() => props.handleDeny()}
                    >{!props.isDenying ? 'Refuser' : 'Patienter...'}</Button>}
                  </>
              }
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

