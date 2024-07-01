import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { useDispatch } from 'react-redux';
import { setSelectedParticiapantId, setSelectedProgrammeId } from '../../../store/userSlice';
import { COLORS, FONTS } from '../../../constants/theme';
import { capitalizeStrOnFirstLetter } from '../../../helpers/helperFunctions';
import { Card } from 'react-native-paper';

export const InterventionCard = ({ programme }) => {
  //const {programme} = intervention;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const sanitizeHyphen = (heure_deb, heure_fin) => {
    if (heure_fin && heure_fin !== "") {
      return `${heure_deb} - ${heure_fin}`
    }
    return heure_deb;
  }

  const gotToProgrammeDetail = () => {
    dispatch(setSelectedProgrammeId(programme.id));
    navigation.dispatch(StackActions.push('Detailprogramme'));
  };

  return (
    <>
      <Card
        mode='contained'
        onPress={() => gotToProgrammeDetail()}
        style={{
          borderRadius: 0,
          backgroundColor: 'transparent'
        }}
      >
        <View style={styles.container}>
          <View style={styles.elementContainer}>
            <Text style={{
              color: '#fff',
              backgroundColor: programme.categorie?.couleur && programme.categorie?.couleur !== "" ? programme.categorie?.couleur : COLORS.ORANGE,
              paddingHorizontal: 10,
              paddingVertical: 2
            }}>{sanitizeHyphen(programme.heure_deb, programme.heure_fin)}</Text>
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  color: programme.categorie?.couleur && programme.categorie?.couleur !== "" ? programme.categorie?.couleur : COLORS.ORANGE,
                  lineHeight: 20,
                  fontFamily: FONTS.POPPINS_REGULAR
                }}
              >
                {capitalizeStrOnFirstLetter(programme.titre)}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </>
  );
};
