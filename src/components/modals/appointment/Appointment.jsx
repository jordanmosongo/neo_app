import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import Modal from 'react-native-modal';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { userServices } from '../../../services/userServices';
import { styles } from './styles';
import axios from 'axios';
import { SelectDropdownComponent } from '../../select/dropdown/SelectDropdownComponent';
import MainButton from '../../buttons/main/MainButton';
import apiUrls from '../../../../apiUrls';
import { ManageStatusComponent } from '../../ManageStatusComponent';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';

export const AppointmentModal = (props) => {

  const [sujet, setSujet] = useState('');
  const [lieu, setLieu] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
   const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const [error, setError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [heureDebutVisible, setHeureDebutVisible] = useState(false);
  const [heureFinVisible, setHeureFinVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [stands, setStands] = useState([]);
  const [selectedStand, setSelectedStand] = useState(null);

  const token = useSelector(({ user: { tokens } }) => tokens.access);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.eventConversation}/${props.chatId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setEvents(data);
    } catch (error) {
      console.log('error on fetch events', error);
    }
  }
  const fetchStands = async (eventId) => {
    try {
      const { data } = await axios.get(`${apiUrls.standBase}/${eventId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setStands(data);
    } catch (error) {
      console.log('error on fetch stands', error);
    }
  }
  useEffect(() => {
    resetValues();
    (async () => {
      await fetchEvents();
    })();
  }, []);

  const resetValues = () => {
    setSujet('');
    setLieu('');
    setHeureDebut('');
    setDescription('');
  };

  const handleSubmit = async () => {
     try {
      const isValidForm = sujet === '' || heureDebut === '' || description === '';
      if (isValidForm) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 3000);
        return null;
      }
      setError(false);
      setSubmitLoading(true);
      setResponseResult(null);
      await userServices.creatRendezvous({
        heure_deb: heureDebut,
        heure_fin: "",
        titre: sujet,
        description: description,
        lieu: lieu,
        stand: selectedStand.id,
        destinateur: props.destId,
        eventId: selectedEvent.id
      }, token, selectedEvent.id);
      setResponseResult('done');
      setSubmitLoading(false);
      resetValues();
      props.showConfirmationAlert(); 
    } catch (error) {
      console.log('error on creating appointment', error);
      // setResponseError(error);
      setSubmitLoading(false);
    } 
  };

  return (
    <>
      <Modal
        isVisible={props.isVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 15,
             }}>
              <Text style={{
                color: COLORS.WHITE,
                fontSize: TEXT_SIZES.CONTACT_CARD_FIRST_TITLE,
                fontWeight: '500',
                fontFamily: FONTS.POPPINS_REGULAR,
              }}>Créer un rendez-vous</Text>
              <Icon
                name="md-close-outline"
                type="ionicon"
                size={26}
                color="#fff"
                onPress={() => {                  
                  props.closeModal();
                  setSelectedEvent(null);
                  setStands([]);
                  resetValues();
                }}
              />
            </View>
          </View>
          <ScrollView style={{
            marginHorizontal: 20,
            paddingBottom: 10
          }}>
            <SelectDropdownComponent
              items={events}
              defaultButtonText="Choisir un événement"              
              onSelectItem={async (selectedItem) => {
                 setSelectedEvent(selectedItem);
                setStands([]);
                await fetchStands(selectedItem.id);
              }}
              keyToShow='nom'
            />
            <TextInput
              style={styles.input}
              value={sujet}
              placeholder={'Saisir le sujet du rendez-vous'}
              placeholderTextColor={'#888888'}
              onChangeText={(text) => setSujet(text)}
            />
            <TextInput
              style={{...styles.input, height: 60, marginTop: 10,fontFamily: 'Poppins-Regular',}}
              value={description}
              placeholder={'Saisir la description du rendez-vous'}
              placeholderTextColor={'#888888'}
              multiline={true}
              onChangeText={(text) => setDescription(text)}
            />           
            <TextInput
              style={styles.input}
              value={lieu}
              placeholder={'Saisir  un lieu'}
              placeholderTextColor={'#888888'}
              onChangeText={(text) => setLieu(text)}
            />
            <View style={styles.timeViewContainer}>
              <TouchableOpacity
               style={{width: '100%'}}
               onPress={() => setHeureDebutVisible(true)}>
                <Text style={{ 
                  color: COLORS.MAIN_BLUE, 
                  marginVertical: 5,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: TEXT_SIZES.PARAGRAPH
                  }}>Début :</Text>
                <View
                  style={styles.timeView}>
                  <Text style={{ 
                    color: heureDebut === '' ? '#888888' : COLORS.MAIN_BLUE, 
                    fontSize: TEXT_SIZES.PARAGRAPH, 
                    marginLeft: 10,
                    fontFamily: FONTS.POPPINS_REGULAR, }}>
                    {heureDebut === '' ? "--:--" : heureDebut}
                  </Text>
                  <Icon
                    name="time-outline"
                    type="ionicon"
                    size={16}
                    color={COLORS.MAIN_BLUE}                    
                  />
                </View>
              </TouchableOpacity>
              {heureDebutVisible === true ? (
                <RNDateTimePicker
                  value={new Date()}
                  mode={'time'}
                  onChange={(event, date) => {
                    setHeureDebutVisible(false);
                    const beginningTime = `${date.getHours()}:${date.getMinutes() == 0 ? '00' : date.getMinutes()}`;
                    const arr = beginningTime.split(':');
                      const hourSegment = arr[0].length === 1 ? `0${arr[0]}` : arr[0];
                      const minuteSegment = arr[1].length === 1 ? `0${arr[1]}` : arr[1];
                      setHeureDebut(`${hourSegment}:${minuteSegment}`);            
                  }}
                />
              ) : null}       
            </View>
            <SelectDropdownComponent   
              disabled={stands.length === 0}         
              items={stands}
              defaultButtonText="Choisir un stand"
              onSelectItem={(selectedItem) => setSelectedStand(selectedItem)}
              keyToShow='code'
            />
            <>
              {error === true ? (
                <View>
                  <Text style={{ 
                    color: 'red' ,
                    fontFamily: 'Poppins-Regular',
                    fontSize: TEXT_SIZES.PARAGRAPH
                    }}>
                    Veuillez remplir tous les champs
                  </Text>
                </View>
              ) : null}</>
            <View style={styles.buttons}>
              <MainButton
                label={'Valider'}
                icon={''}
                verticalMargin={8}
                loading={submitLoading}
                radius={50}
                padding={0}
                marginRight={0}
                withBorder={true}
                color="#00a7d5"
                txtColor="#fff"
                handleClick={async () => await handleSubmit()}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          // isStatusError={true}
          handleActionOnError={async () => {
            setResponseError(null);
          }}
      />)}
    </>
  )
}