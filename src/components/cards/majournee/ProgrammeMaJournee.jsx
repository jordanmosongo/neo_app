import React, { useWindowDimensions } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/base';
import { Icon } from 'react-native-elements';

import { setSelectedProgrammeId } from '../../../store/userSlice';
import { globalStyles } from '../../../constants/styles';
import { BORDERS_WITH_SHADOWS, COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';

export const ProgrammeMajournee = props => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { id, image, titre1, titre2, description, color, time, location, theme } = props;

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
        });
      }}
      style={{
        ...BORDERS_WITH_SHADOWS.PROGRAM_CARD,
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 15,
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
              backgroundColor: color,
              paddingHorizontal: 10,
              textAlign: 'center',
              color: '#FFFFFF',
              fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
            }}>
            {time}
          </Text>
        )}
        {image !== '' && (
          <View
            style={{
              borderRadius: 100,
            }}>
            {image ? (
              <Image style={{ width: 40, height: 40 }} source={{ uri: image }} />
            ) : (
              <Image
                style={{ width: 40, height: 40 }}
                source={require('../../../components/assets/PICTO__RENDEZ-VOUS_MIN.png')}
              />
            )}
          </View>
        )}
      </View>
      <View>
        {(location && location !== '') && (
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
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: TEXT_SIZES.PARAGRAPH,
                color: COLORS.MAIN_BLUE,
                fontFamily: 'Poppins-Regular',
                marginTop: 5,
                maxWidth: 200,
              }}>
              {capitalizeStrOnFirstLetter(location)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
     { ((titre1 !== '' || theme !== '') || (titre1 !== '' && theme !== '') ) && <View>
        <Text
          numberOfLines={1}
          style={{
            color: color,
            ...globalStyles.cardFirstLevelTitle,
            fontFamily: FONTS.POPPINS_MEDIUM,
            marginTop: 2
          }}>
          {titre1 !== '' && theme !== '' ? `${capitalizeStrOnFirstLetter(titre1)} - ${capitalizeStrOnFirstLetter(theme)}` : 
            titre1 !== '' && theme === '' ? `${capitalizeStrOnFirstLetter(titre1)}` :
            titre1 === '' && theme !== '' ? `${capitalizeStrOnFirstLetter(theme) || ''}` : ''
          }
        </Text>
      </View>}
      {titre2 !== '' && (
        <Text
          style={{
            ...globalStyles.cardSecondLevelTitle,
            color: color,
            fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
            fontFamily: FONTS.POPPINS_BOLD,
            marginVertical: 3
          }}>
          {capitalizeStrOnFirstLetter(titre2)}
        </Text>
      )}
      {(description && description !== '') && (
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
