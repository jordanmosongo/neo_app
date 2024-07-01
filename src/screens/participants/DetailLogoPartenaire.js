import {Avatar, color, Divider} from '@rneui/base';
import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  // UIManager,
  StyleSheet,
  LayoutAnimation,
  ImageBackground,
  Image,
  Dimensions,
  Button,
  Pressable,
  // Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {Linking} from 'react-native';
import {useParticipant} from '../../hooks/useParticipant';
import {Allheader} from '../../components/header/main/allheader';
import Video from 'react-native-video';
import {MainHeader} from '../../components/header/main/MainHeader';
import VideoPlayer from 'react-native-video-controls';
import {VLCPlayer} from 'react-native-vlc-media-player';
import {DetailHeader} from '../../components/header/main/DetailHeader';
import {useNavigation} from '@react-navigation/native';
import {Helpers} from '../../helpers/helpers';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS } from '../../constants/theme';

// if (
//   Platform.OS === 'android' &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

const Accordion = ({title, children}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleOpen}
        style={styles.heading}
        activeOpacity={0.6}>
        {title}
        <Icon
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

const MyText = ({text}) => {
  // Définir un état pour la longueur maximale du texte
  const [maxLength, setMaxLength] = useState(150);

  // Définir une fonction pour changer la longueur maximale
  const toggleLength = () => {
    // Si la longueur maximale est 100, la passer à la longueur totale du texte
    // Sinon, la repasser à 100
    setMaxLength(maxLength === 150 ? text.length : 150);
  };

  // Rendre le composant <Text> avec le texte tronqué selon la longueur maximale
  // et le composant <TouchableOpacity> avec le texte pour changer la longueur maximale
  return (
    <View>
      <Text
        style={{
          color: '#281D67', // Changer la couleur du texte en rouge
          fontSize: 15, // Changer la taille du texte en 20 pixels
          fontFamily: 'Poppins-Regular', // Changer la police du texte en Arial
          textAlign: 'justify', // Aligner le texte au centre
          // letterSpacing: -1, // Réduire l'espace entre les caractères de 1 pixel
          // lineHeight: 19, // Réduire la hauteur de ligne à 18 pixels
          padding: 0, // Enlever le padding autour du texte
        }}>
        {text.length > maxLength ? text.slice(0, maxLength) + '...' : text}
      </Text>
      {text.length > 100 && ( // Afficher le texte cliquable seulement si le texte est plus long que 100 caractères
        <TouchableOpacity onPress={toggleLength}>
          <Text
            style={{
              color: 'blue',
              marginBottom: 10,
              fontFamily: 'Poppins-Regular',
            }}>
            {text.length > maxLength ? 'Voir plus' : 'Voir moins'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const DetailLogoPartenaire = ({route}) => {
  useParticipant();
  const {Participant_mapped, item} = route.params;

  const Intervention = (
    <View>
      <Text style={styles.sectionTitle}>Interventions</Text>
    </View>
  );
  const title4 = (
    <View>
      <Text style={styles.sectionTitle}>Contact</Text>
    </View>
  );
  const title2 = (
    <View>
      <Text style={styles.sectionTitle}>Présentation</Text>
    </View>
  );
  const Reseauxsociaux = (
    <View>
      <Text style={styles.sectionTitle}>Réseaux sociaux</Text>
    </View>
  );
  const Videos = (
    <View>
      <Text style={styles.sectionTitle}>Vidéos</Text>
    </View>
  );
  const title3 = (
    <View>
      <Text style={styles.sectionTitle}>Documents</Text>
    </View>
  );
  const Equipes = (
    <View>
      <Text style={styles.sectionTitle}>Équipe</Text>
    </View>
  );
  const texts = item.presentation;
  const presentation = (
    <View>
      <View>
        <MyText text={`${texts}`} />
      </View>
    </View>
  );
  const intervention = (
    <ScrollView>
      {item.interventions.map(intervention => {
        return (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{marginBottom: 7}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      backgroundColor: `${intervention.categorie.couleur}`,
                    }}>
                    <Text
                      style={{
                        color: '#ffffff',
                        padding: 3,
                      }}>
                      {intervention.heure_deb}-{intervention.heure_fin}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Image
                      style={{width: 27, height: 27}}
                      source={require('../../components/assets/PICTO__LIEU.png')}
                    />
                    <Text style={{color: '#102F8B'}}>
                      {intervention.stand.description}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    color: '#281D67',
                    fontFamily: 'Poppins-Regular',
                    maxWidth: 200,
                  }}>
                  {intervention.categorie.label}
                </Text>
                <Text
                  style={{
                    color: '#281D67',
                    fontFamily: 'Poppins-Bold',
                    maxWidth: 230,
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {intervention.titre}
                </Text>
                <Text
                  style={{
                    color: '#281D67',
                    fontFamily: 'Poppins-Regular',
                    maxWidth: 230,
                  }}
                  numberOfLines={4}
                  ellipsizeMode="head">
                  {intervention.description}
                </Text>
              </View>
              <View
                style={{
                  width: 60,
                  height: 60,
                  marginRight: 10,
                  borderRadius: 100,
                }}>
                <Image
                  style={{width: 50, height: 50}}
                  source={{uri: `${intervention.categorie.icone}`}}
                />
              </View>
            </View>
          </>
        );
      })}
    </ScrollView>
  );
  const ReseauxS = (
    <View style={{flexDirection: 'row', marginBottom: 5}}>
      <TouchableOpacity
        style={{marginLeft: 5}}
        onPress={() => Linking.openURL(item.linkedin)}>
        <Image
          source={require('../../components/assets/PICTO__LINKEDIN.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginLeft: 10}}
        onPress={() => Linking.openURL(item.twitter)}>
        <Image
          source={require('../../components/assets/PICTO__TWITTER.png')}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
  const Vid = (
    <View>
      <View style={{flex: 1}}>
        <VideoPlayer
          source={{uri: `${item.documents.video}`}} // source en ligne
          style={styles.videoPlayer} // style du lecteur vidéo
          rate={1.0} // vitesse de lecture
          volume={1.0} // volume du son
          isMuted={false} // muet ou non
          resizeMode="cover" // mode de redimensionnement
          shouldPlay={false} // lecture automatique
          isLooping // boucle ou non
          onBuffer={this.onBuffer} // fonction appelée quand la vidéo est en attente
          onError={this.onError} // fonction appelée quand la vidéo ne peut pas être chargée
          onEnd={this.onEnd} // fonction appelée quand la vidéo est terminée
          // navigator={this.props.navigator} // propriété requise pour le bouton de retour par défaut
          // thumbnail={{uri: 'https://example.com/thumbnail.jpg'}}
        />
      </View>
    </View>
  );
  const equipes = (
    <View>
      {item.equipe?.map(eq => {
        return (
          <View style={styles.card}>
            <Image
              style={styles.image}
              source={{
                uri: `${eq?.photo_path}`,
              }}
            />
            <View style={styles.details}>
              <Text style={styles.name}>
                {eq?.nom} {eq?.prenom}
              </Text>
              <Text style={styles.jobTitle}>{eq?.fonction}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  const Documents = (
    <View style={{flex: 1}}>
      <Text
        style={{
          color: 'blue',
          fontSize: 15,
          marginBottom: 10,
        }}
        onPress={() => Linking.openURL(`${item.documents.pdf}`)}>
        {' '}
        Fichier de presentation Pdf
      </Text>
    </View>
  );
  const Contact = (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: '#102F8B', fontFamily: 'Poppins-Bold'}}>
          {item.coordonnee.contact.nom}
        </Text>
        <Text style={{color: '#102F8B', fontFamily: 'Poppins-Regular'}}>
          {item.coordonnee.contact.fonction}
        </Text>
        <View style={{flexDirection: 'row'}}>
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
              color: '#102F8B',
              fontFamily: 'Poppins-Regular',
              marginLeft: 5,
            }}>
            {item.coordonnee.contact.telephone}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
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
              color: '#102F8B',
              fontFamily: 'Poppins-Regular',
              marginLeft: 5,
            }}>
            {item.coordonnee.contact.email}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../components/assets/PICTO__ADRESSE.png')}
            style={{
              width: 20,
              height: 20,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#102F8B',
              fontFamily: 'Poppins-Regular',
              marginLeft: 5,
            }}>
            {item.coordonnee.contact.adresse.numero}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderRadius: 100,
        }}>
        {!item.coordonnee.contact.photo ? (
          <Image
            style={{
              width: 70,
              height: 70,
              borderRadius: 100,
              resizeMode: 'center',
            }}
            source={require('../../components/assets/PICTO_DEFAULT_PROFIL.jpeg')}
            // source={require('../../components/assets/PICTO__DEFAULT__PROFIL.png')}
          />
        ) : (
          <Image
            source={{uri: `${item.coordonnee.contact.photo}`}}
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
       withTitle={false} 
       noBackAction={true}
      /> 
      <View style={{paddingHorizontal: 20, backgroundColor: COLORS.WHITE}}>
        <BackNavigation 
          title={'Accueil'} 
          goBack={() => navigation.goBack()}
          paddingVertical={20}
          />
      </View>
      {/* <View style={{backgroundColor: '#fff'}}>
        <Pressable onPress={() => navigation.goBack()} style={{margin: 20}}>
          <Text style={{color: '#271d67', fontWeight: 'bold', marginBottom: 5}}>
            {item.type}
          </Text>
          <View
            style={{
              backgroundColor: '#271d67',
              width: 20,
              height: 20,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="chevron-back-outline"
              type="ionicon"
              size={15}
              color="#fff"
            />
          </View>
        </Pressable>
      </View> */}
      <ScrollView style={{backgroundColor: '#fff'}}>
        <View>
          <View style={{flex: 1}}>
            <View style={{paddingHorizontal: 35}}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <Image
                  style={{width: 85, height: 85, resizeMode: 'contain'}}
                  source={{uri: `${Helpers.getPhotoUrl(item.logo)}`}}
                />
                <View style={{marginLeft: 10}}>
                  <Text
                    numberOfLines={4}
                    style={{
                      fontSize: 18,
                      color: '#281D67',
                      fontFamily: 'Poppins-Bold',
                      fontWeight: 'bold',
                      maxWidth: 250,
                    }}>
                    {item.nom}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{fontSize: 16, color: '#281D67'}}>
                    {item.domaine}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{width: 27, height: 27, color: 'white'}}
                  source={require('../../components/assets/PICTO__LIEU.png')}
                />
                <Text style={{color: '#102F8B'}}>Stand</Text>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                {/* {item.interventions.length === 0 ? (
                  <Accordion title={Intervention}>
                    <Text style={{color: '#102F8B'}}>
                      Pas d'intervation pour l'instant
                    </Text>
                  </Accordion>
                ) : (
                  <Accordion title={Intervention}>{intervention}</Accordion>
                )} */}

                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={title4}>{Contact}</Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={title2}>{presentation}</Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={Reseauxsociaux}>{ReseauxS}</Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={title3}>{Documents}</Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                {item.equipe.length === 0 ? (
                  <Accordion title={Equipes}>
                    <Text style={{color: '#102F8B'}}>Pas d'equipe</Text>
                  </Accordion>
                ) : (
                  <Accordion title={Equipes}>{equipes}</Accordion>
                )}
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={Videos}>{Vid}</Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                {/*)}*/}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailLogoPartenaire;

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
    alignItems: 'baseline',
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
    marginLeft: '1%',
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
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: 200,
  },
  jobTitle: {
    fontSize: 16,
    color: '#666',
  },
  videoPlayer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width * 0.5625,
  },
});
