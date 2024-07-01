/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
// import { WebView } from 'react-native-webview'
import { MainHeader } from '../../components/header/main/MainHeader';
import { COLORS } from '../../constants/theme';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import axios from 'axios';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';

export const Stand = () => {
  const { selectedEvent } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();

  const getPlan = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(route.params ? route.params.exposantPlan : selectedEvent.plan);
      setResponseResult(result);
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
    } catch (error) {
      setResponseError(error);
    }

  }

  useEffect(() => {
    (async () => await getPlan())();
  }, []);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Plan des stands" 
        noBackAction={true} />
      <View style={{ paddingHorizontal: 20, backgroundColor: COLORS.WHITE }}>
        <BackNavigation
          title={route.params ? 'Plan du stand' : 'Plan des stands'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      {isLoading && <View style={{
        flex: 1,
      }}>
        <MaiLoaderComponent />
      </View>}
      {/* {!isLoading && <WebView
        scrollEnabled
        source={{ uri: route.params ? route.params.exposantPlan : selectedEvent.plan }}
        setDisplayZoomControls={true}
        setBuiltInZoomControls={true}
        textZoom={100}
        style={{
        }}
        containerStyle={{
          flex: 1
        }}
      />} */}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await getPlan();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
}




