import React, { useState, useEffect } from 'react';
import {
  View, 
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import { useNavigation } from '@react-navigation/native';
import { EmptyListComponent } from '../../components/empty/EmptyList';
import { userServices } from '../../services/userServices';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../../constants/theme';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { globalStyles } from '../../constants/styles';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { MainHeader } from '../../components/header/main/MainHeader';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';
import { IntervenantItem } from './ItervenantItem';

const Detailprogramme = () => {
  const [programmeDetails, setProgrammeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const { width } = useWindowDimensions();
  const { selectedProgrammeId, tokens } = useSelector(state => state.user);
  const navigation = useNavigation();

  const fetchProgramDetails = async () => {
    try {
      setIsLoading(true);
      const result = await userServices.getDetailProgramme(
        selectedProgrammeId,
        tokens.access,
      );
      setProgrammeDetails(result);
      setResponseResult(result);
      setIsLoading(false);
    } catch (error) {
      console.log('error on fetching detail program', error);
      setIsLoading(false);
      setResponseError(error);
    }
  };

  const manageTwoStringsToShow = (str1, str2) => {
    if (str1 && str2) {
      if (str1 !== "" && str2 !== "") {
        return `${capitalizeStrOnFirstLetter(str1)} - ${capitalizeStrOnFirstLetter(str2)}`;
      }
      if (str1 !== "" && str2 === "") {
        return capitalizeStrOnFirstLetter(str1);
      }
      return capitalizeStrOnFirstLetter(str2); 
    }
    if (!str1 && str2) {
      if (str2 !== "") return capitalizeStrOnFirstLetter(str2);
      return "";
    }
    if(str1 && !str2) {
      if(str1 !== "") return capitalizeStrOnFirstLetter(str1);
      return "";
    }
    return "";
  }

  useEffect(() => {
    (async () => await fetchProgramDetails())();
  }, []);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Détail programme"
        noBackAction={true}
      />
      <View style={{ paddingHorizontal: 10, backgroundColor: COLORS.WHITE }}>
        <BackNavigation
          title={'Programme'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      {!isLoading ? <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
        <View
          style={{
            width: '100%',
            backgroundColor: COLORS.WHITE,
            paddingHorizontal: 10,
          }}>
          <View style={{ paddingHorizontal: 10 }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View
                style={{
                  width: '70%',
                  alignItems: 'flex-start'
                }}>          
                  <Text
                    style={{
                      backgroundColor: programmeDetails?.categorie.couleur !== "" ? programmeDetails?.categorie.couleur : COLORS.ORANGE,
                     // width: Platform.OS === 'android' ? 120 : 130,
                     paddingHorizontal: 10,
                      paddingVertical: 2,
                      textAlign: 'center',
                      color: '#FFFFFF',
                      fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
                      fontWeight: 'bold',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {manageTwoStringsToShow(programmeDetails?.heure_deb, programmeDetails?.heure_fin)}
                  </Text>            
                {((programmeDetails?.stand && programmeDetails?.stand?.description && programmeDetails?.stand.description !== '') || 
                (programmeDetails?.categorie.for_room && programmeDetails?.salle !== '')) && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <Icon
                      name="location-outline"
                      type="ionicon"
                      color={COLORS.MAIN_BLUE}
                      size={18}
                      style={{
                        marginLeft: -3
                      }}
                    />
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: TEXT_SIZES.PARAGRAPH,
                        color: COLORS.MAIN_BLUE,
                        fontFamily: FONTS.POPPINS_REGULAR,
                        maxWidth: 160,
                      }}>
                      {programmeDetails?.categorie.for_room ? capitalizeStrOnFirstLetter(programmeDetails?.salle) :
                        capitalizeStrOnFirstLetter(programmeDetails?.stand.description)}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {programmeDetails?.categorie.icone !== '' && (
                <View
                  style={{
                    backgroundColor: programmeDetails?.categorie.couleur,
                    borderRadius: 100,
                  }}>
                  {programmeDetails?.categorie.icone ? (
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={{ uri: programmeDetails?.categorie.icone }}
                    />
                  ) : (
                    <Image
                      style={{ width: 40, height: 40 }}
                      source={require('../../components/assets/PICTO__RENDEZ-VOUS_MIN.png')}
                    />
                  )}
                </View>
              )}
            </View>
            {(programmeDetails?.theme && programmeDetails?.theme !== "") && <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  ...globalStyles.cardFirstLevelTitle,
                  color: programmeDetails?.categorie.couleur !== "" ? programmeDetails?.categorie.couleur : COLORS.ORANGE,
                  marginTop: 2,
                  fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
                  fontFamily: FONTS.POPPINS_MEDIUM
                }}>
                {manageTwoStringsToShow(programmeDetails?.categorie.description, programmeDetails?.theme)}
              </Text>
            </View>}
            {programmeDetails?.titre !== '' && (
              <Text
                style={{
                  ...globalStyles.cardSecondLevelTitle,
                  color: programmeDetails?.categorie.couleur !== "" ? programmeDetails?.categorie.couleur : COLORS.ORANGE,
                  marginTop: 5,
                  fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
                  fontFamily: FONTS.POPPINS_BOLD
                }}>
                {capitalizeStrOnFirstLetter(programmeDetails?.titre)}
              </Text>
            )}
            {(programmeDetails?.description !== '') && (
              <View style={{
                marginTop: -10,
              }}>
                <RenderHtml
                  source={{
                    html: `     
                      <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px;">
                      <p style="">
                      ${programmeDetails?.description}
                      </p>
                      </div>          
                    `}}
                  contentWidth={width}
                  systemFonts={['Poppins-Regular']}
                />
              </View>
            )}
          </View>
          <View
            style={{ padding: 10, borderTopWidth: 0.5, borderColor: '#01bee6' }}>
            <Text
              style={{
                fontFamily: FONTS.POPPINS_BOLD,
                color: '#01bee6',
                fontSize: SIZES.medium,
              }}>
              Intervenants
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {isLoading && (
              <View style={{ margin: 20 }}>
                <MaiLoaderComponent />
              </View>
            )}
            {!isLoading && programmeDetails?.intervenants.length === 0 && (
              <View style={{ marginTop: 10 }}>
                <EmptyListComponent
                  message={"Liste des intervenants à venir !"}
                />
              </View>
            )}
            {!isLoading &&
              programmeDetails?.intervenants.length !== 0 &&
              programmeDetails?.intervenants.map(intervenant => {
                 return (
                  <IntervenantItem
                    key={intervenant.id}
                    id={intervenant.id}
                    nom={intervenant.user.nom}
                    prenom={intervenant.user.prenom}
                    photo={intervenant.photo}
                    fonction={intervenant.fonction}
                    entreprise={intervenant.organisation.nom}
                    is_contact_status={intervenant.is_contact_status}
                    profils={intervenant.profil}
                    interventions={intervenant.intervetions}
                    is_expert={intervenant.is_expert}
                    is_speaker={intervenant.is_speaker}
                    from_structure={intervenant.from_structure}
                    raison_sociale={intervenant.raison_sociale}
                    organisation={intervenant.organisation}
                    refresh={async () => {
                      await fetchProgramDetails();
                    }}
                  />
                );
              })}
          </ScrollView>
          {(!isLoading && programmeDetails?.intervenants.length > 0) && <View style={{ padding: 10, borderTopWidth: 0.5, borderColor: '#01bee6' }}></View>}
        </View>
      </ScrollView> : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && <ManageStatusComponent
        error={responseError}
        nbreOfRepetitions={nbreOfRepetitions}
        isStatusError={true}
        handleActionOnError={async () => {
          await fetchProgramDetails();
          setNbreOfRepetitions((prevState) => prevState + 1);
        }}
      />}
    </>
  );
};

export default Detailprogramme;
