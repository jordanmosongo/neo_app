import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, Text, ScrollView, Dimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { COLORS, FONTS, TEXT_SIZES } from '../constants/theme';
import axios from 'axios';
import apiUrls from '../../apiUrls';
import { MaiLoaderComponent } from './loaders/MainLoader';

const { width } = Dimensions.get('window');

const countPartnersByType = data => {
  const counts = {}; // créer un objet vide
  data.forEach(item => {
    // pour chaque élément des données
    if (counts[item.type]) {
      // si le type existe déjà dans l'objet
      counts[item.type]++; // incrémenter le compteur
    } else {
      // sinon
      counts[item.type] = 1; // initialiser le compteur à 1
    }
  });
  return counts; // retourner l'objet avec les comptes
};

const ListlogoPremuims = () => {
  const [logoPremuim, setLogoPremuim] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {selectedEvenementId, tokens} = useSelector((state) => state.user);

  const fetchExposants = async() => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${apiUrls.baseUrl}/api/evenement/${selectedEvenementId}/exposant?type=premium`, {
        headers: {Authorization: `JWT ${tokens.access}`},
      })
      setLogoPremuim(data);
      setLoading(false);
    } catch (error) {
      console.log('error on fetch home exposants', error);
    }
  }

  useEffect(() => {
    (async() => await fetchExposants())();
  }, []);

  const counts = countPartnersByType(logoPremuim);

  if (loading) {
    return (
      <View style={{margin: 30}}>
        <MaiLoaderComponent/>
      </View>
    )
  }

  return (
    <ScrollView style={{
      width: '100%',
      paddingVertical: 20
    }}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {Object.keys(counts).map(
          ( item, index ) => (
            <View
             key={index}
             style={{
              alignItems: 'center',
              width: '100%',
            }}>
              <Text
                style={{
                  fontSize: TEXT_SIZES.PROGRAM_SECOND_TITLE,
                  color: COLORS.MAIN_BLUE,
                  fontFamily: FONTS.POPPINS_MEDIUM,
                  marginVertical: 10
                }}>
                {item}
              </Text>
              <ScrollView>
                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '95%',
                }}>
                  {[...logoPremuim]
                    .filter(p => p.type === item) // filtrer les données par type
                    .map((item) => (
                      <TouchableOpacity
                         onPress={() => {
                          navigation.navigate('DetailPartenaire', {
                            id: item.id,
                          })
                        }
                        }>
                        <Image
                          source={{ uri: item.logo }}
                          style={{
                            width: width >= 600 ? 100 : 70,
                            height: width >= 600 ? 80 : 55,
                            resizeMode: 'contain',
                            marginHorizontal: width >= 600 ? 20 : 10,
                            marginVertical: 20,
                          }}
                        />
                      </TouchableOpacity>
                    ),
                    )}
                </View>
              </ScrollView>
            </View>
          ),
        )}
      </View>
    </ScrollView>
  );
};
export default ListlogoPremuims;
