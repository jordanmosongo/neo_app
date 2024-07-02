import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import apiUrls from '../../../apiUrls';
import { useNavigation } from '@react-navigation/native';
import { MainHeader } from '../../components/header/main/MainHeader';
import { SearchInput } from '../../components/inputs/search/SearchInput';
import { COLORS } from '../../constants/theme';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { ExposantItem } from '../../components/cards/exposant/ExposantItem';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';

const { width } = Dimensions.get('window');

const Exposants = () => {
  const [exposants, setExposants] = useState([]);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [filteredExposants, setFilteredExposants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { selectedEvenementId, tokens } = useSelector(state => state.user);
  const navigation = useNavigation();

  const fetchExposants = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(`${apiUrls.baseEventExposant}/${selectedEvenementId}/exposant`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      });
      setExposants(data);
      setFilteredExposants(data)
      setResponseResult("success");
      setIsLoading(false);
    } catch (error) {
      console.log('error on fetch exposant', error);
      setResponseError(error);
    }
  }

  const onChangeSearch = (search) => {
    const exp = new RegExp(search, "i");
    const tempArray = [...exposants];
    const filteredArray = tempArray.filter((item) => {
      const { nom } = item;
      if (exp.test(`${nom}`)) {
        return item;
      }
    });
    setFilteredExposants(filteredArray);
  };

  useEffect(() => {
    (async () => await fetchExposants())();
  }, []);

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Partenaires exposants"
        logoSize={100}
        bottomRightRadius={80}
        withImage={true}
        imageNameFor="EXPOSANTS"
        noBackAction={true}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          padding: 5,
        }}>
        <View style={{ backgroundColor: COLORS.WHITE, paddingHorizontal: 10 }}>
          <BackNavigation
            title={'Tableau de bord'}
            goBack={() => navigation.goBack()}
            paddingVertical={10}
          />
        </View>
        {isLoading && <MaiLoaderComponent/>}
        {!isLoading && <>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SearchInput
            placeholder={'Rechercher'}
            inputHeight={40}
            onChangeSearch={(val) => onChangeSearch(val)}
            inputWidth={width >= 600 ? '90%' : '90%'}
          />
        </View>
        <ScrollView
         showsVerticalScrollIndicator={false}
         style={{ margin: 10 }}>
          <View>
            {filteredExposants.map((item, index) => {
              return (
                <ExposantItem exposant={item} key={index} />
              );
            })}
          </View>
        </ScrollView></>}
      </View>
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchExposants();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default Exposants;
