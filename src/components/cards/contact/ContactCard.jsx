import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

import { Card, Avatar, Button } from 'react-native-paper';
import { styles } from './styles';
import { FONTS } from '../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';

const {width} = Dimensions.get('window');

export const ContactCard = (props) => {
  const currentUser = {
    name: props.name,
    firstname: props.firstname,
    role: props.role,
    organization: props.organization,
    organizationPhoto: props.organizationPhoto,
    photo: props.photo
  }
  return (
    <Card
      mode='contained'
      onPress={() => {
        if (props.redirect) {
          props.handleRedirection();
        } else {
          props.withNoCardAction ? null : props.handleClick && props.handleClick(currentUser)
        }
      }}
      style={{
        borderRadius: 0,
        backgroundColor: 'transparent'
      }}>
      <View style={styles.container}>
        <View style={{ ...styles.elementContainer, paddingBottom: props.withNoMessage ? 10 : 0 }}>
          {props.photo && props.photo !== "" ? <Avatar.Image size={60} source={{ uri: `${props.photo}` }} /> :
            <Avatar.Text size={60}
              label={`${props.firstname[0]}${props.name[0]}`}
              labelStyle={{ color: '#fff', fontSize: 16,fontFamily: 'Poppins-Regular', }}
            />
          }
          <View style={{
            marginLeft: 10,
            width: width >= 600 ? '87%' : '77%',
           }}>
            <Text style={styles.elementTitle}>{props.firstname} {props.name}</Text>
            <Text style={{
              ...styles.text,
            }}>{capitalizeStrOnFirstLetter(props.role)}</Text>
            {!props.from_structure ? <Text style={{
              ...styles.text,
              textTransform: 'capitalize'
            }}>{props.organization}</Text> : 
            <Text style={{
              ...styles.text,
            }}>{props.raison_sociale && props.raison_sociale !== '' ? props.raison_sociale : 
            props.organizationEntity?.adresse_organisation?.ville }</Text> 
            } 
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: !props.from_structure ? 'space-between' : 'flex-end',
            }}>
              {!props.from_structure && <Image
                source={{ uri: `${props.organizationPhoto}` }}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain'
                }}
              />}
              {props.withCardAction &&
               <View style={{...styles.actionsContainer}}>
                {!props.isDenying && <Button
                  style={{
                    backgroundColor: '#F2F2F2',
                    marginLeft: 10,
                    fontFamily: FONTS.POPPINS_REGULAR
                  }}
                  labelStyle={{
                    fontFamily: FONTS.POPPINS_REGULAR
                  }}
                  icon={props.mainButtonIcon}
                  loading={props.isAccepting}
                  mode='text'
                  onPress={() => props.handleButtonClick()}
                >{props.mainButtonLabel}</Button>}
                {props.isInvitation && (
                  !props.isAccepting && <Button
                    style={{
                      backgroundColor: '#F2F2F2',
                      marginLeft: 10,  
                                          
                    }}
                    labelStyle={{
                      fontFamily: FONTS.POPPINS_REGULAR
                    }}
                    icon={props.mainButtonIcon}
                    loading={props.isDenying}
                    mode='text'
                    onPress={() => props.handleDeny()}
                  >{props.secondButtonLabel}</Button>
                )}
              </View>}
            </View>
          </View>
        </View>
      </View>
    </Card>
  )
}