import {
  Text,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ListPartenaires from '../components/ListPartenaires';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useParticipant } from '../hooks/useParticipant';
import { useEventLogo } from '../hooks/useEventLogoPremuim';
import { useMessagetoContact } from '../hooks/useContact';
import { useDetailtParticipants } from '../hooks/useDetailtParticipants';
import { COLORS, FONTS } from '../constants/theme';
import { MainHeader } from '../components/header/main/MainHeader';
import axios from 'axios';
import { MaiLoaderComponent } from '../components/loaders/MainLoader';
import { ManageStatusComponent } from '../components/ManageStatusComponent';
import apiUrls from '../../apiUrls';
import { useMajournee } from '../hooks/useMaJournee';

const { width } = Dimensions.get('window');

const ActivityTile = (props) => {
  const navigation = useNavigation();
  const { image, text, color, direction } = props;
  return (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        width: width >= 600 ? 260 : 140,
        height: width >= 600 ? 160 : 95,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        padding: 5,
        marginRight: width >= 600 ? 10 : 2,
        marginBottom: width >= 600 ? 10 : 2,
      }}
      onPress={() => {
        navigation.navigate(direction);
      }}>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: width >= 600 ? 100 : 70,
          height: width >= 600 ? 100 : 70,
          resizeMode: 'contain'
        }}
      />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          color: '#ffffff',
          maxWidth: '100%',
          textAlign: 'center',
          top: -10,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Home = () => {
  useMajournee();
  useParticipant();
  useMessagetoContact();
  useEventLogo();
  useDetailtParticipants();

  const [backImage, setBackImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const { selectedEvent, configData } = useSelector(state => state.user);
  const dummyActivities = [
    {
      id: 1,
      text: 'Programme',
      image: require('../components/assets/PICTO__PROGRAMME.png'),
      color: '#856AB1',
      direction: 'Mesprogrammes',
    },
    {
      id: 2,
      text: 'Partenaires exposants',
      image: require('../components/assets/PICTO__PARTENAIRES.png'),
      color: '#01BEE6',
      direction: 'Exposants',
    },
    {
      id: 3,
      text: 'Ma journée',
      image: require('../components/assets/PICTO__JOURNEE.png'),
      color: '#ff6600',
      direction: 'Majournee',
    },
    {
      id: 4,
      text: 'Participants',
      image: require('../components/assets/PICTO__PARTICIPANTS.png'),
      color: '#009af4',
      direction: 'Participants',
    },
    {
      id: 5,
      text: 'Lecteur de badge',
      image: require('../components/assets/PICTO__BADGES.png'),
      color: '#4a00b5',
      direction: 'Badgelecteur',
    },
    {
      id: 6,
      text: 'Plan de stands',
      image: require('../components/assets/PICTO__PLAN_STAND.png'),
      color: '#ff409d',
      direction: 'Stand',
    },
  ];
  const fetchConfigurations = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.pageConfigurationBase}`);
      setBackImage(data.barre_navigation)
      setResponseResult(data);
    } catch (error) {
      setResponseError(error);
    }
  }

  const formatEventDate = (eventDate) => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const customDate = new Date(eventDate);
    if (eventDate) {
      return `${customDate.getDate()} ${months[customDate.getMonth()]} ${customDate.getFullYear()}`;
    }
    return '';
  }

  useEffect(() => {
    (async () => await fetchConfigurations())();
  }, []);

  return (
    <>
      <MainHeader
        withTitle={false}
        noBackAction={true}
        noRadius={true}
        redirectToDashboard={true}
      />
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.WHITE
      }}>
        <ScrollView style={{
          backgroundColor: '#fff',
        }}>
          <ImageBackground
            source={{ uri: configData?.barre_navigation }}
            resizeMode='cover'
            imageStyle={{ borderBottomRightRadius: 100 }}
            borderBottomRightRadius={100}>
            <View
              style={{
                borderBottomRightRadius: 100,
                backgroundColor: COLORS.MAIN_BLUE,
                opacity: 0.85
              }}>
              <View style={{
                marginHorizontal: 40,
                marginVertical: 10
              }}>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 18,
                    fontFamily: FONTS.POPPINS_BOLD,
                    textAlign: 'center'
                  }}>
                  {selectedEvent?.nom}
                </Text>
                <Text style={{
                  color: COLORS.WHITE,
                  fontSize: 15,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  textAlign: 'center'
                }}>{selectedEvent.lieu_evenement ? `${formatEventDate(selectedEvent?.date)}, ${selectedEvent.lieu_evenement}` : `${formatEventDate(selectedEvent?.date)}`}</Text>

              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginHorizontal: 20,
                  gap: 10,
                  paddingBottom: 30,
                  flexWrap: 'wrap'
                }}>
                {dummyActivities.map(activity => (
                  <ActivityTile
                    key={activity.id}
                    image={activity.image}
                    text={activity.text}
                    color={activity.color}
                    direction={activity.direction}
                  />
                ))}
              </View>
            </View>
          </ImageBackground>
          <ListPartenaires />
        </ScrollView>
      </SafeAreaView>

      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchConfigurations();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default Home;
