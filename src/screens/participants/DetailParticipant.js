import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { ConfirmationModal } from '../../components/modals/confirmation/ConfirmationModal';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { InterventionCard } from '../../components/cards/intervention/InterventionCard';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { MainAccordion } from '../../components/accordion/main/MainAccordion';
import { DetailParticipantHeaderCard } from '../../components/cards/participant/detail/DetailParticipantHeaderCard';
import { DetailParticipantBodyCard } from '../../components/cards/participant/detail/DetailParticipantBodyCard';
import { setRefreshNumber } from '../../store/userSlice';
import RenderHtml from 'react-native-render-html';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { MainHeader } from '../../components/header/main/MainHeader';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';

const Profil = ({ route }) => {
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const { selectedEvenementId, selectparticipant_id, tokens, refreshNumber } = useSelector(state => state.user);
  const [isMethodError, setIsMethodError] = useState(false);

  const token = tokens.access;
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [participantDetail, setParticipantDetail] = useState({});
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message',
  });

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const customHTML = {
    html: `     
      <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px;">      
        ${participantDetail?.presentation}      
      </div>          
    `};
  
  const checkIfNotParticipant = () => {
    if (!route.params) {
      return false;
    }
    return route.params.isNotParticipant;
  }

  const fetchDetailParticipant = async () => {
    try {
      setIsFetching(true)
      let URL = '';
      if (checkIfNotParticipant()) {
        URL = `${apiUrls.baseParticipant}/${selectparticipant_id}`
      } else {
        URL = `${apiUrls.baseParticipant}/${selectparticipant_id}/${selectedEvenementId}`
      }
      const { data } = await axios.get(URL, {
        headers: { Authorization: `JWT ${token}` }
      });
      setParticipantDetail(data);
      setResponseResult(data);
      setIsFetching(false);
    } catch (error) {
      console.log('error occured', error);
      setResponseError(error);
      setIsMethodError(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchDetailParticipant();
    })();
  }, [refreshNumber]);

  const handleConsent = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${apiUrls.contacts}`,
        { participant: participantDetail.id },
        { headers: { Authorization: `JWT ${token}` } },
      );
      setLoading(false);
      setIsVisible(false);
      dispatch(setRefreshNumber());
      setLoading(false);
    } catch (error) {
      setResponseError(error);
      setIsMethodError(true);
    }
  }

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Compte participant"
        noBackAction={true}
      />
      {responseResult ? <>
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
          <BackNavigation
            title={'Participant'}
            goBack={() => navigation.goBack()}
            paddingVertical={20}
          />
        </View>
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <View>
            <View style={{ flex: 1 }}>
              <View style={{
                paddingHorizontal: 20
              }}>
                <DetailParticipantHeaderCard
                  isNotParticipant={checkIfNotParticipant()}
                  participantDetail={participantDetail}
                  handleInvite={() => setIsVisible(true)}
                  routeData={route?.params}
                />
                <DetailParticipantBodyCard
                  participantDetail={participantDetail}
                  routeData={route?.params}
                />
                <View style={{ marginBottom: 10 }}>
                  {participantDetail.presentation && <MainAccordion
                    withBottomLine={true}
                    withTopLine={true}
                    titleText={'Présentation'}
                  >
                    <View style={{                 
                    }}>
                      <RenderHtml
                        source={customHTML}
                        contentWidth={width}
                        systemFonts={['Poppins-Regular']}
                      />
                    </View>
                  </MainAccordion>}
                  {(participantDetail?.expertises && participantDetail?.expertises.length > 0) && <MainAccordion withBottomLine={true} titleText={'Expertises'}>
                    <View>
                      {
                        participantDetail.expertises.map((expertise, index) => {
                          return (
                            <View style={{ 
                              flexDirection: 'row', 
                              alignItems: 'center',
                            }}>
                              <View style={{ 
                                width: 5, 
                                height: 5, 
                                borderRadius: 50, 
                                backgroundColor: COLORS.MAIN_BLUE, 
                                marginHorizontal: 10 }}/>
                              <Text key={index} style={{
                                fontFamily: FONTS.POPPINS_REGULAR,
                                color: COLORS.MAIN_BLUE,
                                fontSize: TEXT_SIZES.PARAGRAPH
                              }}>
                                {capitalizeStrOnFirstLetter(expertise)}
                              </Text>
                            </View>
                          )
                        })
                      }
                    </View>
                  </MainAccordion>}
                  {(participantDetail?.centreinterets && participantDetail?.centreinterets.length > 0) && (
                    <MainAccordion withBottomLine={true} titleText={"Centres d'intérêt"}>
                      <View>
                        {participantDetail?.centreinterets?.map((item, index) => {
                          return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <View style={{ width: 5, height: 5, borderRadius: 50, backgroundColor: COLORS.MAIN_BLUE, marginHorizontal: 10 }} />
                              <Text key={index} style={{
                                fontFamily: FONTS.POPPINS_REGULAR,
                                color: COLORS.MAIN_BLUE,
                                fontSize: TEXT_SIZES.PARAGRAPH
                              }}>
                                {capitalizeStrOnFirstLetter(item)}
                              </Text>
                            </View>
                          )
                        })}
                      </View>
                    </MainAccordion>)
                  }
                </View>
              </View>
            </View>
            {(participantDetail.intervetions && participantDetail.intervetions.length > 0 && !checkIfNotParticipant())  && <View
              style={{
                alignItems: 'center',
                paddingHorizontal: 20
              }}>
              <Text
                style={{
                  fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
                  color: COLORS.MAIN_BLUE_LIGHT,
                  fontFamily: 'Poppins-Regular',
                  textAlign: 'left',
                  marginTop: 20,
                  marginBottom: 5
                }}>
                Mes interventions
              </Text>
              {participantDetail.intervetions.map((item, index) => {
                return (
                  <InterventionCard programme={item} key={index} />
                )
              })}
            </View>}
          </View>
        </ScrollView>
      </> : <MaiLoaderComponent />}
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setIsVisible(false);
          setAlertInfo(prevState => ({ ...prevState, visible: false }));
        }}
      />
      <ConfirmationModal
        confirmMessage={`Etes-vous sûr(e) d'envoyer une demande de contact ?`}
        isVisible={isVisible}
        loading={loading}
        handleDeny={() => {
          setIsVisible(false);
        }}
        handleConsent={async () => await handleConsent()}
      />
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
            await fetchDetailParticipant();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default Profil;

