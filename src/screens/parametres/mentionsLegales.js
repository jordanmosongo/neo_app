import React, { useState, useEffect } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { DetailHeader } from '../../components/header/main/DetailHeader';
import { COLORS, FONTS } from '../../constants/theme';
import axios from 'axios';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import RenderHtml, { HTMLContentModel, HTMLElementModel, defaultSystemFonts } from 'react-native-render-html';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import apiUrls from '../../../apiUrls';
import { MainHeader } from '../../components/header/main/MainHeader';
import { useSelector } from 'react-redux';

const MentionLegales = () => {
  const [mentionData, setMentionData] = useState(null);
  const [responseError, setResponseError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const {configData} = useSelector((state) => state.user);

  const { width } = useWindowDimensions();

  const sanitizeTagsFromStr = (str, tagToSearch, tagToReplace) => {
     let sanitizedStr = str;
    while(sanitizedStr.includes(tagToSearch)) {
      sanitizedStr = str.replace(tagToSearch, tagToReplace);
    }
    return sanitizedStr;
  }

  const fetchConfiguration = async () => {
    try {
      if (configData) {
        setMentionData(configData.mention);    
        return null;
      }
      const { data } = await axios.get(apiUrls.pageConfigurationBase);
      setMentionData(data.mention);
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
      ${mentionData}
      </div>          
    `};
  
  const customHTMLElementModels = {
    'font': HTMLElementModel.fromCustomModel({
      tagName: 'font',
      contentModel: HTMLContentModel.mixed
    })
  }

  return (
    <>
      <MainHeader
        withTitle={true}
        noClickOnLogo={route?.params?.showNotif ? false : true}
        title="Mentions légales"
        noBackAction={true}
        hideNotifIcon={route?.params?.showNotif ? false : true}
      />
      <View style={{
        paddingHorizontal: 20,
        backgroundColor: '#fff'
      }}>
        <BackNavigation
          title={'Mentions légales'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      {mentionData ?
        <ScrollView style={{ backgroundColor: COLORS.WHITE }}>
          <View style={{
            borderColor: COLORS.MAIN_BLUE_LIGHT,
            borderTopWidth: 1,
            marginHorizontal: 15,
            marginBottom: 5
          }}></View>
          <View>
            <RenderHtml
              source={customHTML}
              contentWidth={width}
              customHTMLElementModels={customHTMLElementModels}
              tagsStyles={{ div: { fontFamily: 'Poppins-Regular !important' } }}
              systemFonts={[...defaultSystemFonts, 'Poppins-Regular !important']}
            />
          </View>
        </ScrollView> : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !mentionData) && <ManageStatusComponent
        error={responseError}
        nbreOfRepetitions={0}
        isStatusError={true}
        handleActionOnError={async () => {
          navigation.navigate('Login');
        }}
      />}
    </>
  );
};
export default MentionLegales;

