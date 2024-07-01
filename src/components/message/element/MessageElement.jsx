import React from 'react';
import { View, Text, Image } from 'react-native';

import { Avatar, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

import { styles } from './style';
import { globalStyles } from '../../../constants/styles';
import { COLORS } from '../../../constants/theme';

export const MessageElement = ({ element: { user, lastMessage }, handleClick }) => {
  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const { participant_id } = jwt_decode(token);

  const months = ['Janv', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Julllet', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

  const postTitle = (title) => {
    if (title.length > 18) {
      return `${title.substring(0, 18)}...`
    }
    return title;
  }

  const postMessageDate = () => {
    const currentDate = new Date(Date.now());
    const messageDate = new Date(lastMessage.messageDate);

    if (lastMessage.messageDate === '' || !lastMessage.messageDate) {
      return '';
    }

    if (currentDate.getMonth() === messageDate.getMonth()) {
      if (currentDate.getDay() === messageDate.getDay()) {
        return `${messageDate.getHours()}h:${messageDate.getMinutes()}`;
      }
      if (currentDate.getDate() - 1 === messageDate.getDate()) {
        return 'Hier'
      }
    }
    return `${messageDate.getDate()} ${months[messageDate.getMonth()]}`
  }

  const postLastMessage = (message) => {
    if (message.length > 20) {
      return `${message.substring(0, 20)}...`
    }
    return message;
  }

  return (
    <>
      <Card
        mode='contained'
        onPress={() => handleClick(user)}
        style={{
          borderRadius: 0,
          backgroundColor: 'transparent',
        }}>
        <View style={styles.container}>
          <View style={styles.elementContainer}>
            <Avatar.Image size={60} source={{ uri: user.photo }} />
            <View style={{
              marginLeft: 10,
            }}>
              <Text style={{
                 ...globalStyles.cardSecondLevelTitle,
                color: COLORS.MAIN_BLUE,
              }}>{postTitle(`${user.firstname} ${user.name}`)}</Text>
              <Text style={{
                ...globalStyles.cardParagraphe,
                color: COLORS.MAIN_BLUE,
                marginLeft: 3
              }}>{`${participant_id === lastMessage.participantId ? 'vous: ' + postLastMessage(lastMessage.message) : postLastMessage(lastMessage.message)}`}</Text>
              {!user.from_structure && (<Image
                source={{ uri: `${user.organizationPhoto}` }}
                
                style={{
                  width: 30,
                  height: 30,
                  marginTop: 5,
                  marginLeft: 3,   
                  resizeMode: 'contain'               
                }}
              />)}
            </View>
          </View>
          <Text style={{
            color: COLORS.MAIN_BLUE,
            marginRight: 15,
            fontSize: 10, fontFamily: 'Poppins-Regular',
          }}>{postMessageDate()}</Text>
        </View>
      </Card>
    </>
  )
}