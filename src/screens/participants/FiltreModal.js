import React from 'react';
import {View, Text} from 'react-native';

import Modal from 'react-native-modal';
import {Button} from 'react-native-paper';

import {styles} from './styles';

export const FiltreModal = props => {
  return (
    <>
      <Modal isVisible={props.isVisible}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View
              style={{
                padding: 20,
                backgroundColor: '#271d67',
                borderTopEndRadius: 5,
                borderTopStartRadius: 5,
              }}>
              <Text style={styles.title}>Choisissez une catégorie par:</Text>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 10}}>
              <Text style={styles.text}>{props.confirmMessage}</Text>
            </View>
            <View style={styles.actions}>
              <Button
                style={{...styles.button, backgroundColor: '#00a7d5'}}
                loading={props.loading}
                icon={''}
                mode="contained"
                onPress={() => props.handleConsent()}>
                {!props.loading ? 'Oui' : 'Veuillez patienter...'}
              </Button>
              {!props.loading && (
                <Button
                  style={{
                    ...styles.button,
                    backgroundColor: 'gray',
                    marginLeft: 10,
                  }}
                  icon={''}
                  mode="contained"
                  onPress={() => props.handleDeny()}>
                  Non
                </Button>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
