import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

import Modal from 'react-native-modal';
import { Icon } from '@rneui/themed';
import { Badge } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, StackActions } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { userServices } from '../../../services/userServices';
import { styles } from './ModalStyles';
import axios from 'axios';
import { setCanRefreshChat, setMaJourneeInfos } from '../../../store/userSlice';
import { AlertModal } from '../alert/AlertModal';
import { SelectDropdownComponent } from '../../select/dropdown/SelectDropdownComponent';
import MainButton from '../../buttons/main/MainButton';
import apiUrls from '../../../../apiUrls';

export const AppointmentModal = (props) => {
  const [sujet, setSujet] = useState('');
  const [lieu, setLieu] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });
  const [error, setError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [heureDebutVisible, setHeureDebutVisible] = useState(false);
  const [heureFinVisible, setHeureFinVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [stands, setStands] = useState([]);
  const [selectedStand, setSelectedStand] = useState(null);
  const { notif } = useSelector(state => state.user);
  const navigation = useNavigation();
  const navigateToNofication = () => {
    navigation.dispatch(StackActions.push('NOTIFICATION_SCREEN'));
  };

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const { maJournee } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.eventConversation}/${props.chatId}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setEvents(data);
    } catch (error) {
     // throw new Error('error occured on fetch from appointment', error);
    }
  }
  const fetchStands = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.standBase}`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      setStands(data);
    } catch (error) {
      // throw new Error('error occured on fetch from appointment', error);
    }
  }


  useEffect(() => {
    (async () => {
      await fetchEvents();
      await fetchStands();
    })();
  }, []);

  const resetValues = () => {
    setSujet('');
    setLieu('');
    setHeureDebut('');
    setHeureFin('');
    setDescription('');
  };

  const handleSubmit = async () => {
    try {
      const isValidForm = sujet === '' || lieu === '' || heureDebut === '' || heureFin === '' || description === '';

      if (isValidForm) {
        setError(true);
        return null;
      }

      setError(false);
      setSubmitLoading(true);

      const { data } = await userServices.creatRendezvous({
        heure_deb: heureDebut,
        heure_fin: heureFin,
        titre: sujet,
        description: description,
        lieu: lieu,
        eventId: selectedEvent.id,
        stand: selectedStand.id,
        destinateur: props.destId
      }, token, selectedEvent.id);

      dispatch(setMaJourneeInfos([...maJournee, ...[data]]));
      resetValues();

      setAlertInfo({
        visible: true,
        title: 'Opération réussie !',
        message: "Le rendez-vous est créé avec succès"
      })
    } catch (error) {
      // Instructions on error
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <Modal
        isVisible={props.isVisible}
        backdropOpacity={1}
        backdropColor='#fff'
      >
        <View style={styles.modalContainer}>
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                source={require('../../assets/LOGO-NEO.png')}
                style={styles.image}
              />
              <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10 ,fontFamily: 'Poppins-Regular',}}>Rendez-vous</Text>
            </View>
            <View style={styles.notificationContainer}>
              <Badge style={styles.badge} onPress={navigateToNofication}>
                {notif.length}
              </Badge>
              <Icon
                name="notifications-outline"
                type="ionicon"
                size={25}
                color="#fff"
                onPress={navigateToNofication}
              />
            </View>
          </View>
          <View style={styles.modalHeaderContainer}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 20
            }}>
              <Text style={{
                color: '#111',
                fontSize: 17,
                paddingHorizontal: 10,
                fontWeight: '500',fontFamily: 'Poppins-Regular',
              }}>Créer un rendez-vous</Text>
              <Icon
                name="md-close-outline"
                type="ionicon"
                size={30}
                color="#111"
                onPress={() => {
                  resetValues()
                  props.closeModal()
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
              onSelectItem={(selectedItem) => setSelectedEvent(selectedItem)}
              keyToShow='nom'
            />
            <SelectDropdownComponent
              items={stands}
              defaultButtonText="Choisir un stand"
              onSelectItem={(selectedItem) => setSelectedStand(selectedItem)}
              keyToShow='code'
            />
            <TextInput
              style={styles.input}
              value={sujet}
              placeholder={'Saisir le sujet du rendez-vous'}
              placeholderTextColor={'#888888'}
              onChangeText={(text) => setSujet(text)}
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
               style={{width: '48%'}}
               onPress={() => setHeureDebutVisible(true)}>
                <Text style={{ color: 'black', marginVertical: 5,fontFamily: 'Poppins-Regular', }}>Heure de début</Text>
                <View
                  style={styles.timeView}>
                  <Text style={{ color: heureDebut === '' ? '#888888' : '#111', fontSize: 16, marginLeft: 10 ,fontFamily: 'Poppins-Regular',}}>
                    {heureDebut === '' ? "--:--" : heureDebut}
                  </Text>
                  <Icon
                    name="time-outline"
                    type="ionicon"
                    size={16}
                    color="#111"
                    onPress={navigateToNofication}
                  />
                </View>
              </TouchableOpacity>
              {heureDebutVisible === true ? (
                <RNDateTimePicker
                  value={new Date()}
                  mode={'time'}
                  onChange={(event, date) => {
                    setHeureDebutVisible(false);
                    setHeureDebut(
                      `${date.getHours()}:${date.getMinutes() == 0 ? '00' : date.getMinutes()
                      }`,
                    );
                  }}
                />
              ) : null}
              <TouchableOpacity
               style={{width: '48%'}}
               onPress={() => setHeureFinVisible(true)}>
                <Text style={{ color: 'black', marginVertical: 5 ,fontFamily: 'Poppins-Regular',}}>Heure de fin</Text>
                <View
                  style={styles.timeView}>
                  <Text style={{ color: heureFin === '' ? '#888888' : '#111', fontSize: 16, marginLeft: 10,fontFamily: 'Poppins-Regular', }}>
                    {heureFin === '' ? "--:--" : heureFin}
                  </Text>
                  <Icon
                    name="time-outline"
                    type="ionicon"
                    size={16}
                    color="#111"
                    onPress={navigateToNofication}
                  />
                </View>
              </TouchableOpacity>
              {heureFinVisible === true ? (
                <RNDateTimePicker
                  value={new Date()}
                  mode={'time'}
                  onChange={(event, date) => {
                    setHeureFinVisible(false);

                    setHeureFin(
                      `${date.getHours()}:${date.getMinutes() == 0 ? '00' : date.getMinutes()
                      }`,
                    );
                  }}
                />
              ) : null}
            </View>
            <TextInput
              style={{...styles.input, height: 80, marginTop: 10}}
              value={description}
              placeholder={'Saisir la description du rendez-vous'}
              placeholderTextColor={'#888888'}
              multiline={true}
              onChangeText={(text) => setDescription(text)}
            />
            <>
              {error === true ? (
                <View>
                  <Text style={{ color: 'red' ,fontFamily: 'Poppins-Regular',}}>
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
                radius={10}
                padding={0}
                marginRight={0}
                withBorder={true}
                color="#00a7d5"
                txtColor="#fff"
                handleClick={async () => await handleSubmit()}
              />
            </View>
            <View style={{
              height: 10
            }}></View>
          </ScrollView>
        </View>
        <AlertModal
          isAlertVisible={alertInfo.visible}
          title={alertInfo.title}
          confirmMessage={alertInfo.message}
          closeAlert={() => {
            props.closeModal();
            dispatch(setCanRefreshChat());
            setAlertInfo((prevState) => ({ ...prevState, visible: false }));
          }}
        />
      </Modal>
    </>
  )
}