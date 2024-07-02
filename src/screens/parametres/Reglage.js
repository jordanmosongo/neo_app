import React, { useState, useEffect } from 'react';
import { View, Switch, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { DetailHeader } from '../../components/header/main/DetailHeader';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../../constants/theme';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { useSelector } from 'react-redux';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { MainHeader } from '../../components/header/main/MainHeader';

const Reglage = () => {
  const [settings, setSettings] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [isMethodError, setIsMethodError] = useState(false);
  const [refreshNumber, setRefreshNumber] = useState(0);
  const { tokens } = useSelector((state) => state.user);
  const navigation = useNavigation();

  const fetchSettings = async () => {
    try {
      const { data } = await axios.get(apiUrls.parameters, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      setSettings(data);
      setResponseResult(data);
    } catch (error) {
      console.log('error on fetching parameters', error);
      setResponseError(error);
      setIsMethodError(false);
    }
  }

  const toggleChoice = async (parametre) => {
    try {
      setResponseResult(null);
      const { data } = await axios.post(apiUrls.parameters, {
        parametre
      }, {
        headers: { Authorization: `JWT ${tokens.access}` }
      });
      setRefreshNumber((prevState) => prevState + 1);
    } catch (error) {
      setResponseError(error);
      setIsMethodError(true);
    }
  }

  useEffect(() => {
    (async () => await fetchSettings())();
  }, [refreshNumber]);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Paramètres"
        noBackAction={true}
      />
      {settings ? <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        <View style={{ marginHorizontal: 20 }}>
          <BackNavigation
            title={'Paramètres'}
            goBack={() => navigation.goBack()}
            paddingVertical={20}
          />
          {settings?.map((setting, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                  padding: 10,
                  shadowColor: '#B7B3CC',
                  backgroundColor: '#fff',
                  borderBottomColor: '#B7B3CC',
                  borderBottomWidth: 1,
                }}>
                <View style={{ flexDirection: 'row', width: '84%' }}>
                  <Text style={{
                    color: COLORS.MAIN_BLUE,
                    fontFamily: FONTS.POPPINS_REGULAR,
                    fontSize: 13
                  }}>
                    {setting.text}
                  </Text>
                </View>
                <Switch
                  style={{ width: '14%' }}
                  trackColor={{ false: COLORS.GRAY, true: COLORS.GRAY }}
                  ios_backgroundColor={COLORS.MAIN_BLUE}
                  thumbColor={setting.etat ? COLORS.MAIN_BLUE : COLORS.WHITE}
                  onValueChange={async () => {
                    await toggleChoice(setting.parametre);
                  }}
                  value={setting.etat}

                />
              </View>
            )
          })}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: TEXT_SIZES.PARAGRAPH,
              fontFamily: FONTS.POPPINS_REGULAR,
              color: COLORS.MAIN_BLUE
            }}>Pour clôturer mon compte - </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CLOSE_ACCOUNT')}>
              <Text style={{
                fontSize: TEXT_SIZES.PARAGRAPH,
                fontFamily: FONTS.POPPINS_BOLD,
                color: COLORS.MAIN_BLUE_LIGHT
              }}>Cliquer ici</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView> : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            if (isMethodError) {
              setResponseError(null);
              return null;
            }
            await fetchSettings();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default Reglage;
