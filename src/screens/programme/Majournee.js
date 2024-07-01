import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Image } from '@rneui/base';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Dialog from 'react-native-dialog';
import { EmptyListComponent } from '../../components/empty/EmptyList';

import { MaJourneeList } from '../../components/cards/majournee/MaJourneeList';
import { MainHeader } from '../../components/header/main/MainHeader';
import { SearchInput } from '../../components/inputs/search/SearchInput';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import { userServices } from '../../services/userServices';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import axios from 'axios';
import apiUrls from '../../../apiUrls';

const { width } = Dimensions.get('window');

function Majournee() {
  const [isVisible, setIsVisible] = useState(false);
  const [loadingAnnuler, setloadingAnnuler] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [filteredProgramsJounee, setFilteredProgramsJounee] = useState([]);
  const choosedCategory = React.useRef([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmptyDay, setIsEmptyDay] = useState(false);
  const [allProgrammesMajournee, setAllProgrammesMajournee] = useState([]);
  const [allProgrammesMajourneeFiltered, setAllProgrammesMajourneeFiltered] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const { maJournee } = useSelector(state => state.user);
  const { selectedEvenementId, tokens } = useSelector(state => state.user);
  const navigation = useNavigation();

  const fetchMaJournee = async () => {
    try {
      setIsFetching(true);
      const { data } = await axios.get(`${apiUrls.baseParticipant}/${selectedEvenementId}/programmes`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      setResponseResult(data);
      setIsFetching(false);
    } catch (error) {
      console.log('eeor occuered', error);
      setResponseError(error);
    }
  }

  const onChangeSearch = (search) => {
    const exp = new RegExp(search, "i");
    const tempArray = [...allProgrammesMajournee];
    const filteredArray = tempArray.filter((item) => {
      const { titre1, titre2, theme } = item;
      if (exp.test(`${titre1} ${titre2} ${theme}`)) {
        return item;
      }
    });
    setAllProgrammesMajourneeFiltered(filteredArray);
  };

  useEffect(() => {
    (async () => await fetchMaJournee())();
    const arr = maJournee.map((element, index) => {
      return {
        id: element.id,
        image: element.categorie.icone == '' ? require('../../components/assets/images/pictos/PICTO__RENDEZ-VOUS.png') : element.categorie.icone,
        titre1: element.categorie.label,
        titre2: element.titre,
        description: element.description,
        color: element.categorie.couleur === '' ? '#ff6600' : element.categorie.couleur,
        categoryCode: element.categorie.label === '' ? 'Rendez-vous' : element.categorie.label,
        // time: `${element.heure_deb} - ${element.heure_fin}`,
        time: element.heure_fin && element.heure_fin !== '' ? `${element.heure_deb} - ${element.heure_fin}` : element.heure_deb,
        location: Object.keys(element.stand).length > 0 ? element.stand.description : element.salle,
        theme: element.theme,
        debut: element.heure_deb
      };
    });
    setAllProgrammesMajournee(arr);
    setAllProgrammesMajourneeFiltered(arr);
  }, []);

  // La fonction qui échappe le majuscule, les accents et les espaces
  function echapper(chaine) {
    // On convertit la chaîne en minuscules
    let chaineSansMajuscule = chaine.toLowerCase();
    // On échappe les accents
    let chaineSansAccents = chaineSansMajuscule
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    // On échappe les espaces
    // On renvoie la chaîne échappée
    return chaineSansAccents.replace(/\s/g, '');
  }

  // La fonction qui filtre les personnes selon la valeur saisie
  function filtrer() {
    // On échappe la valeur saisie
    let valeurEchappee = echapper(searchTerm);
    // On filtre les personnes qui contiennent la valeur dans le nom, le prénom ou la fonction
    const resultat = allProgrammesMajournee.filter(function (personne) {
      return (
        echapper(personne.titre1).includes(valeurEchappee) ||
        echapper(personne.titre2).includes(valeurEchappee)
      );
    });
    // On renvoie le résultat
    return resultat;
  }

  const Majournee = filtrer();

  const data = allProgrammesMajournee.map((categoriesLabels, index) => {
    return { title: categoriesLabels.categoryCode };
  });
  const uniqueTitles = [...new Set(data.map(item => item.title))];
  const categoriesLabel = uniqueTitles.map(title => {
    return {
      title,
      count: data.filter(item => item.title === title).length,
    };
  });

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Ma journée"
        logoSize={100}
        bottomRightRadius={80}
        withImage={true}
        imageNameFor="MAJOURNEE"
        pictoBgColor="#ff6600"
        noBackAction={true}
      />
      <View style={{ backgroundColor: COLORS.WHITE, paddingHorizontal: 20 }}>
        <BackNavigation
          title={'Tableau de bord'}
          goBack={() => navigation.goBack()}
          paddingVertical={20}
        />
      </View>
      {responseResult ?
        maJournee.length > 0 ?
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 8,

            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                margin: 10,
                marginTop: 0,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <SearchInput
                placeholder={'Rechercher'}
                inputHeight={45}
                onChangeSearch={val => {
                  //setSearchTerm(val)
                  onChangeSearch(val);
                }}
                inputWidth={width >= 600 ? '90%' : '80%'}
              />
              <View
                style={{
                  justifyContent: 'center',
                  paddingRight: 20,
                }}>
                <Modal isVisible={isVisible}>
                  <View style={styles.wrapper}>
                    <View style={styles.container}>
                      <View
                        style={{
                          padding: 20,
                          backgroundColor: '#271d67',
                          borderTopEndRadius: 5,
                          borderTopStartRadius: 5,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}>
                        <Text style={styles.title}>
                          Filtrer par catégorie
                        </Text>
                        <Icon
                          name="close-outline"
                          type="ionicon"
                          onPress={() => {
                            setIsVisible(false);
                          }}
                          size={35}
                          color="#fff"
                        />
                      </View>
                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        style={{
                          maxHeight: 300,
                          paddingVertical: 20
                        }}>
                        {categoriesLabel.map((category, index) => {
                          const title = category.title;
                          return (
                            <RadioButton
                              key={`categoryLabel-${index}`}
                              titleToShow={`${title[0].toUpperCase()}${title.slice(1)}`}
                              theTitle={title}
                              categories={choosedCategory.current}
                              onPress={() => {
                                if (choosedCategory.current.indexOf(category.title) !== -1) {
                                  let theIndex = choosedCategory.current.indexOf(category.title);
                                  choosedCategory.current.splice(theIndex, 1);
                                } else {
                                  choosedCategory.current.push(category.title);
                                }
                                let programFiltered = [];
                                Majournee.map(pgm => {
                                  if (
                                    choosedCategory.current.indexOf(
                                      pgm.categoryCode,
                                    ) !== -1
                                  ) {
                                    programFiltered.push(pgm);
                                  }
                                });
                                setFilteredProgramsJounee(programFiltered);
                              }}
                            />
                          );
                        })}
                      </ScrollView>
                      <View style={styles.actions}>
                        <Button
                          style={{ ...styles.button, backgroundColor: COLORS.MAIN_BLUE_LIGHT }}
                          labelStyle={{
                            fontFamily: FONTS.POPPINS_REGULAR,
                            fontSize: TEXT_SIZES.PARAGRAPH
                          }}
                          onPress={() => setIsVisible(false)}
                          icon={''}
                          mode="contained">
                          Valider
                        </Button>
                        <Button
                          loading={loadingAnnuler}
                          style={{
                            ...styles.button,
                            backgroundColor: COLORS.GRAY,
                            marginLeft: 10,
                          }}
                          labelStyle={{
                            fontFamily: FONTS.POPPINS_REGULAR,
                            fontSize: TEXT_SIZES.PARAGRAPH
                          }}
                          icon={''}
                          mode="contained"
                          onPress={() => {
                            choosedCategory.current = [];
                            setFilteredProgramsJounee([]);
                            setIsVisible(false);
                          }}>
                          Annuler
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.MAIN_BLUE,
                      alignItems: 'flex-end',
                      fontSize: 13,
                      fontFamily: FONTS.POPPINS_REGULAR
                    }}>
                    Filtrer
                  </Text>
                  <Image
                    source={require('../../components/assets/PICTO__FILTRER.png')}
                    style={{
                      width: 20,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: 'flex-end', right: 32 }}></View>

            <ScrollView>
              <View style={{ marginHorizontal: 13 }}>
                {filteredProgramsJounee.length > 0 ? (
                  <>
                   <MaJourneeList programs={filteredProgramsJounee} />
                  </>
                ) : (
                  <MaJourneeList programs={allProgrammesMajourneeFiltered} />
                )}
              </View>
            </ScrollView>

          </SafeAreaView> : <EmptyListComponent hideIcon={true} message={"Vous n'avez aucun programme !"} />
        : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchMaJournee();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
}

export const RadioButton = (props) => {
  const { theTitle, categories, onPress, titleToShow } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      style={{
        marginHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={styles.text}>{titleToShow}</Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: '#009af4',
          backgroundColor:
            categories.indexOf(theTitle) !== -1 ? '#009af4' : 'transparent',
          width: 20,
          height: 20,
          alignItems: 'center',
        }}>
        {categories.indexOf(theTitle) !== -1 && (
          <Icon
            name="checkmark-outline"
            type="ionicon"
            size={14}
            color="#fff"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE,
  },
  text: {
    color: '#111',
    paddingVertical: 10,
    lineHeight: 22,
    fontSize: TEXT_SIZES.PARAGRAPH,
    fontFamily: FONTS.POPPINS_REGULAR
  },
  actions: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginLeft: 5,
    marginBottom: 5,
  },
});
export default Majournee;
