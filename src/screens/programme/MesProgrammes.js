import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Avatar, Image } from '@rneui/base';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { MainHeader } from '../../components/header/main/MainHeader';
import { SearchInput } from '../../components/inputs/search/SearchInput';
import { EmptyListComponent } from '../../components/empty/EmptyList';
import Modal from 'react-native-modal';
import { ProgrammeItem } from '../../components/cards/program/ProgramItemCard';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { userServices } from '../../services/userServices';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';
import { TEST_ID } from 'react-native-gifted-chat';

const {width} = Dimensions.get('window');

const RadioButton = (props) => {
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
      <Text style={styles.text}>{capitalizeStrOnFirstLetter(titleToShow)}</Text>
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

const AllPrograms = (props) => {
  const { programs } = props;

  return (
    <>
      {programs.map((programme) => {
        return (
          <ProgrammeItem
            key={programme.id}
            id={programme.id}
            image={programme.image}
            titre1={programme.titre1}
            titre2={programme.titre2}
            description={programme.description}
            color={programme.color}
            time={programme.time}
            location={programme.location}
            theme={programme.theme}
            salle={programme.salle}
            for_room={programme.for_room}
          />
        );
      })}
    </>
  );
};

function MesProgrammes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEmptyDay, setIsEmptyDay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loadingAnnuler, setloadingAnnuler] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [programmes, setProgrammes] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const { selectedEvenementId, tokens } = useSelector(state => state.user);

  const choosedCategory = React.useRef([]);
  const navigation = useNavigation();

  const sortPrograms = (programs) => {
    for (let i = 0; i < programs.length; i++) {
      if ((i + 1 <= programs.length - 1) && programs[i].heure_deb > programs[i + 1].heure_deb) {
        let temp = programs[i];
        programs[i] = programs[i + 1];
        programs[i + 1] = temp;
      }
    }
    return programs;
  }

  const fetchPrograms = async () => {
    try {
      setIsFetching(true);
      const result = await userServices.getEventPrograms(selectedEvenementId, tokens.access);
      const sortedPrograms = sortPrograms(result);
      setResponseResult(result);
      setProgrammes(sortedPrograms);
      setIsFetching(false);
    } catch (error) {
      console.log('error on fetch programmes', error);
      setResponseError(error);   
    }
  }

  useEffect(() => {
    (async () => await fetchPrograms())();
  }, []);

  const allProgrammesMapped = programmes.map((element, index) => {
    return {
      id: element.id,
      image: element.categorie.icone,
      titre1: element.categorie.label,
      titre2: element.titre,
      description: element.description,
      color: element.categorie.couleur,
      categoryCode: element.categorie.label,
      time:( element.heure_fin && element.heure_fin !== "") ? `${element.heure_deb} - ${element.heure_fin}` : element.heure_deb,
      location: element.stand.description,
      theme: element.theme,
      salle: element.salle,
      for_room: element.categorie.for_room
    };
  });

  const data = allProgrammesMapped.map((categoriesLabels, index) => {
    return { title: categoriesLabels.categoryCode };
  });
  const uniqueTitles = [...new Set(data.map(item => item.title))];
  const categoriesLabel = uniqueTitles.map(title => {
    return {
      title,
     count: data.filter(item => item.title === title).length,
    };
  });

  // ici Nous avons recuperer tout les programmes a fin de les afficher par ordre chronologique
  allProgrammesMapped.sort((a, b) => {
    let heurA = a.time.substring(0, 1);
    let heurB = b.time.substring(0, 1);
    let heureDebA = parseInt(heurA);
    let heureDebB = parseInt(heurB);
    return heureDebA - heureDebB;
  });

  // La fonction qui échappe le majuscule, les accents et les espaces
  function echapper(chaine) {
    // On convertit la chaîne en minuscules
    let chaineSansMajuscule = chaine.toLowerCase();
    // On échappe les accents
    let chaineSansAccents = chaineSansMajuscule
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    // On échappe les espaces
    let chaineSansEspaces = chaineSansAccents.replace(/\s/g, '');
    // On renvoie la chaîne échappée
    return chaineSansEspaces;
  }

  // La fonction qui filtre les personnes selon la valeur saisie
  function filtrer() {
    // On échappe la valeur saisie
    let valeurEchappee = echapper(searchTerm);
    // On filtre les personnes qui contiennent la valeur dans le nom, le prénom ou la fonction
    const resultat = allProgrammesMapped.filter(function (personne) {
      return (
        echapper(personne.titre1).includes(valeurEchappee) ||
        echapper(personne.titre2).includes(valeurEchappee) ||
        echapper(personne.description).includes(valeurEchappee) ||
        echapper(personne.theme).includes(valeurEchappee)
      );
    });
    // On renvoie le résultat
    return resultat;
  }
  const programme = filtrer();

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Programme"
        logoSize={100}
        bottomRightRadius={80}
        withImage={true}
        imageNameFor="PROGRAMME"
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
       programmes.length > 0 ? <SafeAreaView
       style={{
         flex: 1,
         backgroundColor: '#fff',
         padding: 8,
         paddingTop: 0
       }}>
       <View
         style={{
           width: '100%',
           flexDirection: 'row',
           marginHorizontal: 12,
           justifyContent: 'space-between',
           alignItems: 'center',
           marginBottom: 20,
         }}>
         <SearchInput
           placeholder={'Rechercher'}
           inputHeight={45}
           onChangeSearch={val => setSearchTerm(val)}
           inputWidth={ width >= 600 ? '90%' : '80%'}
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
                       setFilteredPrograms([]);
                       choosedCategory.current = [];
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
                   }}
                 >
                   {categoriesLabel.map((category, index) => {
                     if (category.title !== "") {
                      return (
                        <RadioButton
                          key={`categoryLabel-${index}`}
                          theTitle={category.title}
                          titleToShow={`${category?.title[0].toUpperCase()}${category?.title.slice(1)}`}
                          categories={choosedCategory.current}
                          onPress={() => {
                            if (
                              choosedCategory.current.indexOf(
                                category.title,
                              ) !== -1
                            ) {
                              let theIndex = choosedCategory.current.indexOf(
                                category.title,
                              );
 
                              choosedCategory.current.splice(theIndex, 1);
                            } else {
                              choosedCategory.current.push(category.title);
                            }
 
                            let programFiltered = [];
                            programme.map(pgm => {
                              if (
                                choosedCategory.current.indexOf(
                                  pgm.categoryCode,
                                ) !== -1
                              ) {
                                programFiltered.push(pgm);
                              }
                            });
                            setFilteredPrograms(programFiltered);
                          }}
                        />
                      );
                     }
                   })}
                 </ScrollView>
                 <View style={{ ...styles.actions }}>
                   <Button
                     style={{ 
                      marginLeft: 5, 
                      backgroundColor: COLORS.MAIN_BLUE_LIGHT,                       
                     }}
                     labelStyle={{
                      fontSize: TEXT_SIZES.PARAGRAPH,
                      fontFamily: FONTS.POPPINS_REGULAR
                     }}
                     onPress={() => setIsVisible(false)}
                     icon={''}
                     mode="contained">
                     Valider
                   </Button>
                   {filteredPrograms && (
                     <Button
                       loading={loadingAnnuler}
                       style={{
                         marginLeft: 5,
                         backgroundColor: COLORS.GRAY,
                         marginLeft: 10,
                       }}
                       labelStyle={{
                        fontSize: TEXT_SIZES.PARAGRAPH,
                        fontFamily: FONTS.POPPINS_REGULAR
                       }}
                       icon={''}
                       mode="contained"
                       onPress={() => {
                         setFilteredPrograms([]);
                         choosedCategory.current = [];
                         setIsVisible(false);
                       }}>
                       Annuler
                     </Button>
                   )}
                 </View>
               </View>
             </View>
           </Modal>

           <TouchableOpacity
             onPress={() => { setIsVisible(true); }}
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
       <ScrollView>
           <View style={{ marginHorizontal: 13 }}>
             {filteredPrograms.length > 0 ? (
               <>
                {filteredPrograms.map((programme) => {
                   return (
                     <ProgrammeItem
                       key={programme.id}
                       id={programme.id}
                       image={programme.image}
                       titre1={programme.titre1}
                       titre2={programme.titre2}
                       description={programme.description}
                       color={programme.color}
                       time={programme.time}
                       location={programme.location}
                       theme={programme.theme}
                       salle={programme.salle}
                       for_room={programme.for_room}
                     />
                   );
                 })}
               </>
             ) : (
               <AllPrograms programs={programme} />
             )}
           </View>
       </ScrollView>        
      </SafeAreaView> : <EmptyListComponent message={'La liste des programmes est vide !'} />
       : <MaiLoaderComponent/>}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            setResponseError(null);
            await fetchPrograms();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
      />)}
    </>
  );
}

const styles = StyleSheet.create({
  contenair: {},
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
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
    fontSize: TEXT_SIZES.PROGRAM_FIRST_TITLE
  },
  text: {
    fontFamily: 'Poppins-Regular',
    paddingVertical: 10,
    lineHeight: 22,
    color: '#040e48',
    fontSize: TEXT_SIZES.PARAGRAPH
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
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PARAGRAPH
  },
});

export default MesProgrammes;
