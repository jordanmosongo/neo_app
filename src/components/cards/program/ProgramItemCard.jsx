import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Image } from '@rneui/base';
import RenderHtml from 'react-native-render-html';

import { Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../../constants/styles';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';
import { setSelectedProgrammeId } from '../../../store/userSlice';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';


export const ProgrammeItem = (props) => {
    const dispatch = useDispatch();  
    const navigation = useNavigation();  
    const { id, image, titre1, titre2, description, color, time, location, theme } = props;
    const {width} = useWindowDimensions();

    const restrictDescriptionSize = (description) => {
      if (!description) {
        return null
      }
      if (description.length > 150) {
        return `${description.substring(0, 120)}...`
      }
      return description;
    }

    const customHTML = {
      html: `     
        <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px;">
        <p style="">
        ${restrictDescriptionSize(description)}
        </p>
        </div>          
      `};
  
    return (
      
      <TouchableOpacity
        onPress={() => {
          dispatch(setSelectedProgrammeId(id));
          navigation.navigate('Detailprogramme', {
            id: id,
            titre1: titre1,
            titre2: titre2,
            description: description,
            color: color,
            time: time,
            location: location,
            image: image,
            theme: theme,
            salle: props.salle,
            for_room: props.for_room
          });
        }}
        style={{
          ...BORDERS_WITH_SHADOWS.PROGRAM_CARD,
          width: '100%',
          backgroundColor: '#fff',
          marginVertical: 5,          
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginBottom: 10,         
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
            marginBottom: -5,
          }}>
          {time !== '' && (
            <Text
              style={{
                backgroundColor: color !== "" ? color : COLORS.ORANGE,
                textAlign: 'center',
                color: '#FFFFFF',
                fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
                paddingHorizontal: 10,
                fontWeight: 'bold',
                marginRight: 10,
              }}>
              {time}
            </Text>
          )}
          {image !== '' ? (
            <View
              style={{
                backgroundColor: color,
                borderRadius: 100,
              }}>
              <Image style={{ width: 40, height: 40 }} source={{ uri: image }} />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: color !== "" ? color : COLORS.ORANGE,
                borderRadius: 100,
              }}>
              <Image style={{ width: 40, height: 40 }} source={require('../../assets/PICTO__RENDEZ-VOUS_MIN.png')} />
            </View>
          )
        }
        </View>
        <View>
          {((location && location !== '') || (props.for_room && props.salle !== "")) && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="location-outline"
                type="ionicon"
                color="#271d67"
                size={18}
                style={{marginLeft: -3}}
              />
              <Text
                numberOfLines={1}
                style={{
                  fontSize: TEXT_SIZES.PARAGRAPH,
                  color: '#271d67',
                  fontFamily: 'Poppins-Regular',
                  position: 'relative',
                  maxWidth: 200,
                  marginTop: 5
                }}>
                { props.for_room ? capitalizeStrOnFirstLetter(props.salle) : capitalizeStrOnFirstLetter(location)}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={{}}>
          {titre1 !== '' && (
            <Text
              style={{
                ...globalStyles.cardFirstLevelTitle,
                color:  color !== "" ? color : COLORS.ORANGE,
                fontFamily: FONTS.POPPINS_MEDIUM,
                marginTop: 5
              }}>
              {titre1 !== '' && theme !== '' ? `${capitalizeStrOnFirstLetter(titre1)} - ${capitalizeStrOnFirstLetter(theme)}` : 
               titre1 == '' && theme !== '' ? `${capitalizeStrOnFirstLetter(theme)}` : capitalizeStrOnFirstLetter(titre1)
              }              
            </Text>
          )}
        </View>
        {titre2 !== '' && (
          <Text
            style={{
              ...globalStyles.cardSecondLevelTitle,
              color:  color !== "" ? color : COLORS.ORANGE,
              fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
              fontFamily: FONTS.POPPINS_BOLD
            }}>
            {capitalizeStrOnFirstLetter(titre2)}
          </Text>
        )}
        {description !== '' && (         
         <View style={{marginTop: -15}}>
          <RenderHtml
            source={customHTML}
            contentWidth={width}
            systemFonts={['Poppins-Regular']}
         /> 
         </View>         
        )}
      </TouchableOpacity>
    );
  };