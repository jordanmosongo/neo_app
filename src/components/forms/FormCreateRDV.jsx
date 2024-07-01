import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userServices } from '../../services/userServices';
import { setMaJourneeInfos } from '../../store/userSlice';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { AlertModal } from '../modals/alert/AlertModal';

export const FormCreateRDV = (props )=> {
    const {visible, onSubmit, onCancel, eventId, accessToken} = props;
  
    const [sujet, setSujet] = useState('');
    const [lieu, setLieu] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [description, setDescription] = useState('');

    const [alertInfo, setAlertInfo] = useState({
      visible: false,
      title: 'Titre',
      message: 'message'
    });
  
    const [error, setError] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
  
    const [heureDebutVisible, setHeureDebutVisible] = useState(false);
    const [heureFinVisible, setHeureFinVisible] = useState(false);
  
    const dispatch = useDispatch();
    const {maJournee} = useSelector(state => state.user);
  
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
        const {data} = await userServices.creatRendezvous({
          heure_deb: heureDebut,
          heure_fin: heureFin,
          titre: sujet,
          description: description,
          lieu: lieu,
        }, accessToken, eventId);

        setSubmitSuccess(true);  
        dispatch(setMaJourneeInfos([...maJournee, ...[data]]));
        
        setAlertInfo({
          visible: true,
          title: 'Opération réussie !',
          message: "Le rendez-vous est créé avec succès"
        })
      } catch (error) {
        setSubmitError(true);
      } finally {
        setSubmitLoading(false);
        setSubmitError(false);
      }     
    };

    function LabeledInput({label, value, onChangeText}) {
        return (
          <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
            />
          </View>
        );
      }
      function CustomButton({color, text, onPress, loading}) {
        return (
          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: color,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 10,
              minWidth: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {loading ? (
              <ActivityIndicator color={'white'} />
            ) : (
              <Text style={{color: 'white', fontSize: 14, fontWeight: 'bold',fontFamily: 'Poppins-Regular',}}>
                {text}
              </Text>
            )}
          </TouchableOpacity>
        );
      }
  
    return (
      <Modal isVisible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title}>Créer un rendez-vous</Text>
  
          <LabeledInput label="Sujet" value={sujet} onChangeText={setSujet} />
          <LabeledInput label="Lieu" value={lieu} onChangeText={setLieu} />
  
          {/*  todo: reformat with component further */}
          <TouchableOpacity onPress={() => setHeureDebutVisible(true)}>
            <Text style={{color: 'black',fontFamily: 'Poppins-Regular',}}>Heure de début</Text>
            <View
              style={{
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'black',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 18, marginLeft: 15,fontFamily: 'Poppins-Regular',}}>
                {heureDebut}
              </Text>
            </View>
          </TouchableOpacity>
          {heureDebutVisible === true ? (
            <RNDateTimePicker
              value={new Date()}
              mode={'time'}
              onChange={(event, date) => {
                setHeureDebutVisible(false);  
                setHeureDebut(
                  `${date.getHours()}:${
                    date.getMinutes() == 0 ? '00' : date.getMinutes()
                  }`,
                );
              }}
            />
          ) : null}
  
          {/*  todo: reformat with component further */}
          <TouchableOpacity onPress={() => setHeureFinVisible(true)}>
            <Text style={{color: 'black',fontFamily: 'Poppins-Regular',}}>Heure de fin</Text>
            <View
              style={{
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: 'black',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 18, marginLeft: 15,fontFamily: 'Poppins-Regular',}}>
                {heureFin}
              </Text>
            </View>
          </TouchableOpacity>
          {heureFinVisible === true ? (
            <RNDateTimePicker
              value={new Date()}
              mode={'time'}
              onChange={(event, date) => {
                setHeureFinVisible(false);
  
                setHeureFin(
                  `${date.getHours()}:${
                    date.getMinutes() == 0 ? '00' : date.getMinutes()
                  }`,
                );
              }}
            />
          ) : null}
  
          <LabeledInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            style={styles.description}
          />
  
          <>
            {error === true ? (
              <View>
                <Text style={{color: 'red',fontFamily: 'Poppins-Regular',}}>
                  Veuillez remplir tous les champs
                </Text>
              </View>
            ) : null}
          </>
  
          <View style={styles.buttons}>
            <CustomButton color="red" text="Fermer" onPress={() => {
              resetValues();
              onCancel();
            }} />
            <CustomButton
              color="green"
              text="Créer"
              onPress={handleSubmit}
              loading={submitLoading}
            />
          </View>
        </View>
        <AlertModal
            isAlertVisible={alertInfo.visible}
            title={alertInfo.title}
            confirmMessage={alertInfo.message}
            closeAlert={() => {
              setAlertInfo((prevState) => ({...prevState, visible: false}));
              resetValues();
            }}
            />
      </Modal>
    );
  };

  const styles = StyleSheet.create({
    contenair: {},
    modal: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
      color: 'black',fontFamily: 'Poppins-Regular',
    },
    label: {
      color: 'black',
    },
    input: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginVertical: 5,
      color: 'black',fontFamily: 'Poppins-Regular',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
    },
    description: {
      width: 300,
      height: 400,
    },
    list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
  });