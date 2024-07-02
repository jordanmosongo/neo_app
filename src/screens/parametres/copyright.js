import React, { useState, useEffect } from 'react';
import { View, ScrollView, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { DetailHeader } from '../../components/header/main/DetailHeader';
import axios from 'axios';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { COLORS } from '../../constants/theme';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import apiUrls from '../../../apiUrls';
import { MainHeader } from '../../components/header/main/MainHeader';
import { useSelector } from 'react-redux';


const Copyright = () => {
  const [data, setData] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const {configData} = useSelector((state) => state.user);

  const route = useRoute();

  const fetchConfiguration = async () => {
    try {
      if (configData) {
        setData(configData.copyrights);
        return null;
      }
      const { data } = await axios.get(apiUrls.pageConfigurationBase);      
      setData(data.copyrights);
    } catch (error) {
      setResponseError(error);
    }
  }

  useEffect(() => {
    (async () => await fetchConfiguration())();
  }, []);

  const customHTML = {
    html: `     
      <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px; margin:20px">
      <p style="font-family: 'Poppins-Regular';">
      ${data} 
      </p>
      </div>          
    `};

  return (
    <>
      <MainHeader
       withTitle={true}
       noClickOnLogo={route?.params?.showNotif ? false : true}
       title="Conditions d'utilisation"
       noBackAction={true}
       hideNotifIcon={route?.params?.showNotif ? false : true}
      />
      <View style={{ padding: 20, paddingVertical: 5, backgroundColor: '#fff' }}>
        <BackNavigation
          title={"Conditions d'utilisation"}
          goBack={() => navigation.goBack()}
          paddingVertical={10}
        />
      </View>
      {data ? <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        <View style={{
          borderColor: COLORS.MAIN_BLUE_LIGHT,
          borderTopWidth: 1,
          marginHorizontal: 15,
          marginBottom: 5
        }}></View>
        <View style={{ marginTop: -50 }}>
          <RenderHtml            
            source={customHTML}
            contentWidth={width}
            tagsStyles={{div:{fontFamily:'Poppins-Regular !important'}}} 
            systemFonts={[...defaultSystemFonts, 'Poppins-Regular !important']}                 
          />
        </View>
      </ScrollView> : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !data) && <ManageStatusComponent
        error={responseError}
        nbreOfRepetitions={0}
        isStatusError={true}
        handleActionOnError={async () => {
          await fetchConfiguration();
        }}
      />}
    </>
  );
};
export default Copyright;
