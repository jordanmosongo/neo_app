import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { MainHeader } from '../../components/header/main/MainHeader';
import { SearchInput } from '../../components/inputs/search/SearchInput';
import { ItemsParticipants } from './ItemsParticipants';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { EmptyListComponent } from '../../components/empty/EmptyList';

import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { capitalizeStrOnFirstLetter } from '../../helpers/helperFunctions';
import { FilterButton } from '../../components/buttons/filter/FilterButton';
import { FlatLoader } from '../../components/loaders/FlatLoader';
import { FilterModal } from '../../components/modals/filter/FilterModal';
import apiUrls from '../../../apiUrls';

const { width } = Dimensions.get('window');

const Participants = () => {
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [keysearch, setKeysearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(false);
  const [eventParticipants, setEventParticipants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pickedCategories, setPickedCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextUrl, setNextUrl] = useState(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  const [isEmptyFilter, setIsEmptyFilter] = useState(false);

  const token = useSelector(({ user: { tokens } }) => tokens.access);
  const { refreshNumber } = useSelector(state => state.user);
  const { participant_id } = jwt_decode(token);

  const { selectedEvenementId, tokens } = useSelector(state => state.user);
  const navigation = useNavigation();

  const URL = `${apiUrls.baseUrl}/v3/api`;

  const getUrl = () => {
    return `${URL}/evenements/${selectedEvenementId}/participants`
  }

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const { data: { results, total_pages, next } } = await axios.get(getUrl(), {
        headers: { Authorization: `JWT ${tokens.access}` }
      });
      setTotalPages(total_pages);
      setNextUrl(next);
      setEventParticipants(results);
      setResponseResult(results);
      setLoading(false);
    } catch (error) {
      console.log('error on fetch participants', error);
      setResponseError(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${apiUrls.baseUrl}/api/profil/${selectedEvenementId}`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      setCategories(() => {
        return [...data.map(({ nom }) => capitalizeStrOnFirstLetter(nom)), 'Expert'];
      });
    } catch (error) {
      console.log('error on fetch categories', error);
    }
  }

  const searchParticipant = async (keyword) => {
    try {
      setIsSearching(true);
      const { data: { results, next } } = await axios.get(`${URL}/evenements/${selectedEvenementId}/participants?search=${keyword}`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      
      setNextUrl(next);
      setEventParticipants(results);
      setResponseResult("results");
      setIsSearching(false);
    } catch (error) {
      console.log('error on search participants', error);
      setResponseError(error);
    }
  }

  const filterParticipants = async (url) => {
    try {
      setIsSearching(true);
      const { data: { results, next } } = await axios.get(url, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      if (results.length === 0) {
        setKeysearch(true);
      }
      setNextUrl(next);
      setEventParticipants(results);
      setResponseResult("results");
      setIsSearching(false);
    } catch (error) {
      console.log('error on filter partipant', error);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchParticipants();
      await fetchCategories();
    })();
  }, [refreshNumber]);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Participants"
        logoSize={100}
        bottomRightRadius={80}
        withImage={true}
        imageNameFor="PARTICIPANTS"
        noBackAction={true}
      />
      <View style={{ paddingHorizontal: 20, paddingTop: 5, backgroundColor: COLORS.WHITE }}>
        <BackNavigation
          title={'Tableau de bord'}
          goBack={() => navigation.goBack()}
          paddingVertical={10}
        />
      </View>
      {loading && <MaiLoaderComponent />}
      {!loading && eventParticipants.length === 0 && !keysearch && <EmptyListComponent message={'La liste des participants est vide !'} />}
      {((!loading && eventParticipants.length > 0) || (keysearch)) && <>
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 20,
          paddingBottom: 0,
          paddingTop: 10
        }}>
          <View style={{
            width: '100%',
            flexDirection: 'row',
            marginBottom: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <SearchInput
              placeholder={'Rechercher'}
              inputHeight={40}
              onChangeSearch={async (keyword) => {
                setKeysearch(true);
                await searchParticipant(keyword);
              }}
              inputWidth={width >= 600 ? '90%' : '80%'}
            />
            <FilterButton onFilterClick={() => setIsVisible(true)} />
          </View>
          {isSearching && (
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ActivityIndicator color={COLORS.MAIN_BLUE} size={20} />
            </View>
          )}
          {eventParticipants.length === 0 && !isSearching && (keysearch || isEmptyFilter) ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text
                style={{
                  color: COLORS.MAIN_BLUE,
                  fontSize: TEXT_SIZES.PARAGRAPH,
                  fontFamily: FONTS.POPPINS_REGULAR
                }}>Aucun résultat trouvé !</Text>
            </View>
          ) :
            (<FlatList
              showsVerticalScrollIndicator={false}
              data={eventParticipants}
              renderItem={({ item, index }) => {
                return (
                  <ItemsParticipants
                    key={index}
                    participant={item}
                    refresh={async () => await fetchParticipants()}
                  />
                )
              }}
              keyExtractor={({ id }) => id}
              refreshing={true}
              onEndReached={async () => {
                try {
                  if (!nextUrl || nextUrl === 'null') {
                    console.log('All items fetched');
                    return null;
                  }
                  setRefreshOnScroll(true);
                  const { data: { results, next } } = await axios.get(nextUrl, {
                    headers: { Authorization: `JWT ${tokens.access}` }
                  });
                  console.log("next url to be fetched", next);
                  setNextUrl(next);
                  setEventParticipants((prevState) => [...prevState, ...results]);
                  setRefreshOnScroll(false);
                } catch (error) {
                  console.log('error on fetch new items', error);
                }
              }}
            />)}
          {refreshOnScroll && <FlatLoader />}
          <FilterModal
            isVisible={isVisible}
            categoriesLabel={categories}
            onCloseModal={() => setIsVisible(false)}
            onValidate={() => setIsVisible(false)}
            onCancel={async () => {
              setIsVisible(false);
              try {
                const { data: { results, next } } = await axios.get(getUrl(page), {
                  headers: { Authorization: `JWT ${tokens.access}` }
                });
                setNextUrl(next);
                setEventParticipants(results);
                setResponseResult("results");
              } catch (error) {
                console.log('error on cancel filter', error);
              }
            }}
            setCategoryTofilter={async (url) => {
              console.log('console.log url', url);
              await filterParticipants(url);
            }
            }
          />
        </View>
      </>}

      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchParticipants();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default Participants;
