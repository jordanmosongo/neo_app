import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Image,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Linking } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import { useNavigation } from '@react-navigation/native';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, SIZES, TEXT_SIZES } from '../../constants/theme';
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from 'react-redux';
import { setRefreshNumber, setSelectedParticiapantId, setSelectedProgrammeId } from '../../store/userSlice';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { ConfirmationModal } from '../../components/modals/confirmation/ConfirmationModal';
import { MainHeader } from '../../components/header/main/MainHeader';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';

const CustomDivider = () => {
  return (<>
    <View
      style={{
        backgroundColor: '#00A7D5',
        alignItems: 'center',
        padding: 0.5,
      }}>
      <View style={styles.divider} />
    </View>
  </>)
}

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleOpen}
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginVertical: 10,
        }}
        activeOpacity={0.6}>
        {title}
        <Icon
          style={{ marginLeft: 10 }}
          color="#00c3ff"
          name={isOpen ? 'chevron-down' : 'chevron-right'}
          size={12}
          type="font-awesome"
        />
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};

const DetailPartenaire = ({ route }) => {
  const [exposantDetail, setExposantDetail] = useState(null);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { width } = useWindowDimensions();
  const { tokens, selectedEvenementId, refreshNumber } = useSelector((state) => state.user);
  const { participant_id } = jwt_decode(tokens.access);

  const dispatch = useDispatch();

  const fetchExposant = async () => {
    try {
      setIsLoading(false);
      const { data } = await axios.get(`${apiUrls.baseUrl}/api/evenement/${selectedEvenementId}/exposant/${route.params.id}`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      });
      console.log('exposant detail', Object.keys(data));
      console.log('exposant detail', {
        nom: data.nom,
        coordonnee: data.coordonnee
      })
      setExposantDetail(data);
      setIsLoading(false);
    } catch (error) {
      const errorCode = error.code;
      console.log('error occured on fetch exposant', error);
      if (errorCode === 'ERR_BAD_REQUEST') {
        console.log('show alert here');
        setAlertInfo({
          visible: true,
          title: 'Information',
          message: "Cette organisation n'a pas de fiche profil !"
        })
      } else {
        console.log('error occured on fetch exposant', error);
      }
    }
  }

  useEffect(() => {
    (async () => await fetchExposant())();
  }, [refreshNumber]);

  const intervention = (
    <ScrollView>
      {exposantDetail?.interventions?.map((intervention, index) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                dispatch(setSelectedProgrammeId(intervention.id));
                navigation.navigate('Detailprogramme', {
                  id: intervention.id,
                  titre1: intervention.categorie?.label,
                  titre2: intervention.titre,
                  description: intervention.description,
                  color: intervention.categorie?.couleur,
                  time: `${intervention.heure_deb} - ${intervention.heure_fin}`,
                  image: intervention.categorie?.icone,
                  theme: intervention.theme,
                  salle: intervention.salle,
                  for_room: intervention.categorie?.for_room
                })
              }}
              key={index}
              style={{
                backgroundColor: '#fff',
                marginVertical: 5,
                borderRadius: 15,
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderWidth: 0.8,
                borderColor: '#B7B3CC',
                marginBottom: 10,
              }}>
              <View style={{ marginBottom: 7 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}>
                  <View>
                    <View
                      style={{
                        backgroundColor: intervention.categorie.couleur !== '' ? `${intervention.categorie.couleur}` : '#FF6600',
                      }}>
                      <Text
                        style={{
                          color: '#ffffff',
                          paddingVertical: 5,
                          paddingHorizontal: 10
                        }}>
                        {`${intervention.heure_deb} - ${intervention.heure_fin}`}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                      marginRight: -5,
                    }}>
                    {(intervention.categorie.icone && intervention.categorie.icone !== "") ? <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: `${intervention.categorie.icone}` }}
                    /> : (
                      <Image
                        style={{ width: 50, height: 50 }}
                        source={require('../../components/assets/PICTO__RENDEZ-VOUS_MIN.png')}
                      />
                    )}
                  </View>
                </View>
                <Text
                  style={{
                    // color: '#281D67',
                    color: intervention.categorie.couleur !== '' ? `${intervention.categorie.couleur}` : '#FF6600',
                    fontFamily: 'Poppins-Regular',
                    fontSize: SIZES.font
                  }}>
                  {intervention?.theme !== "" && intervention.categorie?.label !== "" ? `${intervention.categorie.label} - ${intervention.theme}` :
                    intervention?.theme === "" && intervention.categorie?.label !== "" ? `${intervention.categorie.label}` : `${intervention.theme}`
                  }
                </Text>
                <Text
                  style={{
                    color: intervention.categorie.couleur !== '' ? `${intervention.categorie.couleur}` : '#FF6600',
                    fontFamily: 'Poppins-Bold',
                    fontSize: SIZES.font,
                    lineHeight: 20,
                    marginVertical: 5
                  }}
                >
                  {capitalizeStrOnFirstLetter(intervention.titre)}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        );
      })}
    </ScrollView>
  );


  const ReseauxS = (
    <View style={{ flexDirection: 'row', marginBottom: 15 }}>
      {(exposantDetail?.linkedin) && (
        <TouchableOpacity
          style={{ marginLeft: 5 }}
          onPress={() => Linking.openURL(exposantDetail?.linkedin)}>
          <Image
            source={require('../../components/assets/PICTO__LINKEDIN.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )}
      {exposantDetail?.twitter && (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => Linking.openURL(exposantDetail?.twitter)}>
          <Image
            source={require('../../components/assets/PICTO__TWITTER.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  const Vid = (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flex: 1 }}>
        {exposantDetail?.documents?.video != undefined && (
          <VideoPlayer
            source={{ uri: `${exposantDetail?.documents?.video}` }}
            style={styles.videoPlayer}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping
            onBuffer={this.onBuffer}
            onError={this.onError}
            onEnd={this.onEnd}
          />
        )}
      </View>
    </View>
  );

  const Equipes = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConsent = async (id) => {
      try {
        setLoading(true);

        await axios.post(
          `${apiUrls.contacts}`,
          { participant: id },
          { headers: { Authorization: `JWT ${tokens.access}` } },
        );
        setLoading(false);
        setIsVisible(false);
        dispatch(setRefreshNumber());
        // props.refresh();
      } catch (error) {
        console.log('error on send demand', error);
        setLoading(false);
      }
    };

    return (
      <View>
        {exposantDetail?.equipe.map((eq, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (eq.id === participant_id) {
                  return null;
                }
                dispatch(setSelectedParticiapantId(eq.id));
                navigation.navigate('DetailParticipant');
              }}
              style={{ 
                ...styles.card, 
                justifyContent: 'space-between',
              }}
            >
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Image
                  style={styles.image}
                  source={{
                    uri: `${eq?.photo_path}`,
                  }}
                />
                <View style={styles.details}>
                  <Text style={styles.name}>
                    {capitalizeStrOnFirstLetter(eq?.prenom)} {capitalizeStrOnFirstLetter(eq?.nom)}
                  </Text>
                  <Text style={styles.jobTitle}>
                    {capitalizeStrOnFirstLetter(eq?.fonction)}
                   </Text>
                </View>
              </View>
              {eq.is_contact_status === 'invite' && <TouchableOpacity onPress={() => setIsVisible(true)}>
                <Image
                  style={{ width: 30, height: 30 }}
                  source={require('../../components/assets/PICTO__AJOUT_CONTACT.png')}
                />
              </TouchableOpacity>}
              {eq.is_contact_status === 'accepted' && <Image
                style={{ width: 30, height: 30 }}
                source={require('../../components/assets/PICTO__VALIDE.png')}
              />}
              {eq.is_contact_status === 'pending' && <Image
                style={{ width: 30, height: 30 }}
                source={require('../../components/assets/PICTO__EN__ATTENTE.png')}
              />}
              <ConfirmationModal
                confirmMessage={`Etes-vous sûr(e) d'envoyer une demande de contact à ${eq.nom} ${eq.prenom} ?`}
                isVisible={isVisible}
                loading={loading}
                handleDeny={() => {
                  setIsVisible(false);
                }}
                handleConsent={async () => await handleConsent(eq.id)}
              />
            </TouchableOpacity>
          );
        })}

      </View>
    )
  }
  const Documents = (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          color: COLORS.MAIN_BLUE,
          fontSize: 15,
          marginBottom: 10,
          textDecorationLine: 'underline'
        }}
        onPress={() => Linking.openURL(`${exposantDetail?.documents?.pdf}`)}>
        {' '}
        Fichier Pdf
      </Text>
    </View>
  );

  const Contact = (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 5
      }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: COLORS.MAIN_BLUE, fontFamily: 'Poppins-Bold' }}>
          {exposantDetail?.coordonnee?.contact?.nom}
        </Text>
        <Text
          style={{
            color: COLORS.MAIN_BLUE,
            fontFamily: 'Poppins-Regular',
            maxWidth: 235,
          }}>
          {exposantDetail?.coordonnee?.contact?.fonction}
        </Text>
        {exposantDetail?.coordonnee?.contact?.telephone !== "" && <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../components/assets/PICTO__TEL.png')}
            style={{
              width: 20,
              height: 20,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: COLORS.MAIN_BLUE,
              fontFamily: 'Poppins-Regular',
              marginLeft: 5,
            }}>
            {exposantDetail?.coordonnee?.contact?.telephone}
          </Text>
        </View>}
        <TouchableOpacity
          onPress={() => Linking.openURL(`mailto:${exposantDetail?.coordonnee?.contact?.email}`)}
          style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../components/assets/PICTO__MAIL.png')}
            style={{
              width: 20,
              height: 20,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: COLORS.MAIN_BLUE,
              fontFamily: 'Poppins-Regular',
              marginLeft: 5,
            }}>
            {exposantDetail?.coordonnee?.contact?.email}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={require('../../components/assets/PICTO__ADRESSE.png')}
            style={{
              width: 20,
              height: 20,
              marginBottom: 10,
            }}
          />
          <View>
            <Text
              style={{
                color: COLORS.MAIN_BLUE,
                fontFamily: 'Poppins-Regular',
                marginLeft: 5,
                borderColor: 'red'
              }}>
              {exposantDetail?.coordonnee?.contact?.adresse?.numero}
            </Text>
            <Text
              style={{
                color: COLORS.MAIN_BLUE,
                fontFamily: 'Poppins-Regular',
                marginLeft: 5,
                borderColor: 'red'
              }}>
              {exposantDetail?.coordonnee?.contact?.adresse?.code_postal}, {exposantDetail?.coordonnee?.contact?.adresse?.ville}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderRadius: 100,
        }}>
        {!exposantDetail?.coordonnee?.contact?.photo ? (
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              resizeMode: 'center',
            }}
            source={require('../../components/assets/PICTO_DEFAULT_PROFIL.jpeg')}
          />
        ) : (
          <Image
            source={{ uri: `${exposantDetail?.coordonnee?.contact?.photo}` }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
    </View>
  );
  const navigation = useNavigation();

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Partenaire exposant"
        noBackAction={true}
      />
      <View style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}>
        <BackNavigation
          title={'Partenaire exposant'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      {!isLoading ? <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{
          paddingHorizontal: 20,
        }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (exposantDetail.coordonnee?.contact?.site && exposantDetail.coordonnee?.contact?.site !== '') {
                  Linking.openURL(exposantDetail.coordonnee?.contact?.site);
                }
              }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: 'contain' }}
                source={{ uri: exposantDetail?.logo }}
              />
            </TouchableOpacity>
            <View style={{
              marginLeft: 10,
            }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.MAIN_BLUE,
                  fontFamily: FONTS.POPPINS_BOLD,
                  marginBottom: 3,
                  maxWidth: 250
                }}>
                {exposantDetail?.nom}
              </Text>
              <Text
                numberOfLines={1}
                style={{ 
                  fontSize: TEXT_SIZES.PARAGRAPH, 
                  color: COLORS.MAIN_BLUE, 
                  fontFamily: FONTS.POPPINS_REGULAR,
                  maxWidth: 200
                }}>
                {exposantDetail?.domaine}
              </Text>
              {(exposantDetail?.stand && exposantDetail?.stand.description !== "") && <TouchableOpacity
                onPress={() => {
                  if (exposantDetail?.plan !== "") {
                    navigation.navigate('Stand', { exposantPlan: exposantDetail?.plan })
                  }
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: -6
                }}
              >
                <Image
                  style={{ width: 22, height: 22, color: 'white' }}
                  source={require('../../components/assets/PICTO__LIEU.png')}
                />
                <Text style={{
                  color: COLORS.MAIN_BLUE,
                  fontFamily: FONTS.POPPINS_REGULAR,
                  fontSize: TEXT_SIZES.PARAGRAPH
                }}>{exposantDetail?.stand?.description}</Text>
              </TouchableOpacity>}
            </View>
          </View>
          <View style={styles.container}>
            {/* Contact */}
            <CustomDivider />
            <Accordion title={<Text style={styles.sectionTitle}>Contact</Text>}>
              {Contact}
              {(exposantDetail?.twitter !== '' || exposantDetail?.linkedin !== '') && ReseauxS}
            </Accordion>

            {/* Presentation */}
            
            {exposantDetail?.presentation !== "" && (
              <>
              <CustomDivider />
            <Accordion title={<Text style={styles.sectionTitle}>Présentation</Text>}>
              <View style={{
               }}>
                <RenderHtml
                   source={{
                    html: `     
                      <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px;">           
                      ${exposantDetail?.presentation}          
                      </div>          
                    `}}
                  contentWidth={width}
                  systemFonts={['Poppins-Regular']}
                />
              </View>
            </Accordion>
            </>
            )}

            {/* Interventions */}

            {exposantDetail?.interventions.length > 0 &&
              <>
                <CustomDivider />
                <Accordion title={<Text style={styles.sectionTitle}>Interventions</Text>}>{intervention}</Accordion>
              </>
            }
            {/* Documents */}

            {exposantDetail?.documents?.pdf && (
              <>
                <CustomDivider />
                <Accordion title={
                  <Text style={styles.sectionTitle}>Documents</Text>
                }>{Documents}</Accordion>
              </>
            )}

            {/* Video */}

            {exposantDetail?.documents?.video && exposantDetail?.documents?.video !== '' && (
              <>
                <CustomDivider />
                <Accordion title={<Text style={styles.sectionTitle}>Vidéos</Text>}>{Vid}</Accordion>
              </>
            )}

            {/* Team */}

            {exposantDetail?.equipe.length > 0 && <>
              <CustomDivider />
              <Accordion title={<Text style={styles.sectionTitle}>Équipe</Text>}>
                <Equipes />
              </Accordion>
            </>
            }
          </View>
        </View>
      </ScrollView> : <MaiLoaderComponent />}
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo((prevState) => ({ ...prevState, visible: false }));
          navigation.goBack();
        }}
      />
    </>
  );
};

export default DetailPartenaire;

const styles = StyleSheet.create({
  txt_btn: {
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  safeArea: {
    flex: 1,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    height: 25,
    color: '#00c3ff',
    marginVertical: 0,
  },
  sectionDescription: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#271d67',
    textAlign: 'justify',
    marginBottom: 1,
    marginTop: 1,
  },
  sectioncoordonnes: {
    marginTop: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#271d67',
    // marginBottom: 5,
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  details: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_BOLD,
    maxWidth: 200,
  },
  jobTitle: {
    fontSize: 13,
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_REGULAR,
    maxWidth: 180,
    lineHeight: 22
  },
  videoPlayer: {
    height: Dimensions.get('screen').width * 0.5625,
  },
});
