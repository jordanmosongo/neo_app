import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';

import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
import { Icon } from '@rneui/base';
import { COLORS, FONTS, TEXT_SIZES } from '../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';
import { useSelector } from 'react-redux';
import apiUrls from '../../../../apiUrls';

export const FilterModal = (props) => {
  const { categoriesLabel, setCategoryTofilter } = props;
  const { selectedEvenementId } = useSelector(state => state.user);
  const BASE_URL = `${apiUrls.baseUrl}/v2/api/evenements/${selectedEvenementId}/participants?filter=` 
  const [urlToFilter, setUrlToFilter] = useState(BASE_URL);

  return (
    <>
      <Modal isVisible={props.isVisible}>
        <View style={styles.wrapper}>
          <View style={styles.container}>
            <View
              style={{
                padding: 20,
                backgroundColor: COLORS.MAIN_BLUE,
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
                onPress={() => props.onCloseModal()}
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
                return (
                  <RadioButton
                    key={index}
                    theTitle={category}
                    state={urlToFilter.includes(category.toLowerCase())}
                    onPressCategory={(theTitle) => {
                      const smallTitle = theTitle.toLowerCase();
                      let url = '';

                      if (urlToFilter.includes(smallTitle)) {
                        const splitUrl = urlToFilter.split(smallTitle);
                        if (splitUrl[1].startsWith('-')) {
                          url = `${splitUrl[0]}${splitUrl[1].substring(1)}`
                        } else {
                          url = splitUrl.join('');
                        }                        
                        setUrlToFilter(url);
                        setCategoryTofilter(url);
                      } else {
                        if (urlToFilter.endsWith('=')) {
                          url = `${urlToFilter}${smallTitle}`
                        } else {
                          url = `${urlToFilter}-${smallTitle}`
                        }
                        setUrlToFilter(url);
                        setCategoryTofilter(url);
                      }
                    }}
                  />
                );
              })}
            </ScrollView>
            <View style={{ ...styles.actions }}>
              <Button
                style={{ ...styles.button, backgroundColor: '#00a7d5' }}
                onPress={() => props.onValidate()}
                icon={''}
                mode="contained">
                Valider
              </Button>

              <Button
                loading={false}
                style={{
                  ...styles.button,
                  backgroundColor: 'gray',
                  marginLeft: 10,
                }}
                icon={''}
                mode="contained"
                onPress={() => {
                  setUrlToFilter(BASE_URL);
                  props.onCancel();
                }}>
                Annuler
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const RadioButton = (props) => {
  const { theTitle, onPressCategory, state } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        onPressCategory(theTitle);
      }}
      style={{
        marginHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={styles.text}>{capitalizeStrOnFirstLetter(theTitle)}</Text>
      <View
        style={{
          borderWidth: 2,
          borderColor: '#009af4',
          backgroundColor: state ? '#009af4' : 'transparent',
          width: 20,
          height: 20,
          alignItems: 'center',
        }}>
        {state && (
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
    fontFamily: FONTS.POPPINS_MEDIUM,
    fontSize: 16,
  },
  text: {
    color: COLORS.MAIN_BLUE,
    fontFamily: FONTS.POPPINS_REGULAR,
    fontSize: TEXT_SIZES.PARAGRAPH,
    paddingVertical: 10,
    lineHeight: 22,
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
    // width: '60%',
  },
});
