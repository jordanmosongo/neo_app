import { Avatar } from '@rneui/base';
import React, { useState } from 'react';
import RenderHtml from 'react-native-render-html';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styled from 'styled-components/native';
import { Linking } from 'react-native';
import { useParticipant } from '../../hooks/useParticipant';
import { Helpers } from '../../helpers/helpers';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import { COLORS, FONTS, TEXT_SIZES } from '../../constants/theme';
import { MainHeader } from '../../components/header/main/MainHeader';


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
        style={{ ...styles.heading, paddingVertical: 10 }}
        activeOpacity={0.6}>
        {title}
        <Icon
          color="#00c3ff"
          name={isOpen ? 'chevron-down' : 'chevron-right'}
          size={12}
          type="font-awesome"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};

const Profil = (props) => {
  useParticipant();
  const { infos } = useSelector(state => state.user);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const title1 = (
    <View>
      <Text style={styles.sectionTitle}>Expertises</Text>
    </View>
  );
  const title2 = (
    <View>
      <Text style={styles.sectionTitle}>Présentation</Text>
    </View>
  );
  const title3 = (
    <View>
      <Text style={styles.sectionTitle}>Centres d’intérêt</Text>
    </View>
  );
  const expertise = (
    <View >
      {infos?.expertises?.map((item, index) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 5, height: 5, borderRadius: 50, backgroundColor: COLORS.MAIN_BLUE, marginHorizontal: 10}}/>
            <Text key={index} style={{...styles.sectionDescription}}>
              {item}
              {/* {index < infos?.expertises.length - 1 ? `${item};` : `${item}.`} */}
            </Text>
          </View>
        )
      })}
    </View>
  );

  const Centreinterets = (
    <View>
      {infos?.centreinterets?.map((item, index) => {
        return (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{width: 5, height: 5, borderRadius: 50, backgroundColor: COLORS.MAIN_BLUE, marginHorizontal: 10}}/>
            <Text key={index} style={{...styles.sectionDescription}}>
              {item}
            </Text>
          </View>          
        )
      })}

    </View>
  );

  return (
    <>
      <MainHeader
        withTitle={true}
        title="Mon profil"
        noBackAction={true}
      />
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View>
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 20, paddingTop: 5 }}>
              <BackNavigation
                title={'Mon profil'}
                goBack={() => navigation.goBack()}
                paddingVertical={10}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 15,
                }}>
                <Avatar
                  size={90}
                  rounded
                  containerStyle={{ backgroundColor: '#0D0D0D0D' }}
                  source={{
                    uri: `${Helpers.getPhotoUrl(infos?.photo)}`,
                  }}
                >
                </Avatar>
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('EditProfile');
                    }}
                    style={{
                      width: 100,
                      backgroundColor: '#E94F15',
                      paddingVertical: 5,
                      borderRadius: 25,
                      marginBottom: 25,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontFamily: FONTS.POPPINS_REGULAR,
                        fontSize: TEXT_SIZES.PARAGRAPH
                      }}>
                      Modifier
                    </Text>
                  </TouchableOpacity>
                  {!infos?.from_structure && <Image
                    style={{
                      width: 60,
                      height: 60,
                      marginLeft: 1,
                      resizeMode: 'contain',
                    }}
                    source={{ uri: `${infos?.organisation?.logo}` }}
                  />}
                </View>
              </View>

              <View style={{
                marginBottom: 5,
                marginTop: 5
              }}>
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: 20,// TEXT_SIZES.CONTACT_CARD_FIRST_TITLE,
                    color: '#18418D', // COLORS.MAIN_BLUE,
                    fontFamily: 'Poppins-Bold',
                    maxWidth: 250,
                    fontWeight: 'bold',
                  }}>
                  {`${infos?.user?.prenom} ${infos?.user?.nom}`}
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    fontSize: TEXT_SIZES.CONTACT_CARD_DESCRIPTION,
                    color: COLORS.MAIN_BLUE,
                    fontFamily: FONTS.POPPINS_REGULAR,
                    maxWidth: 180,
                  }}>
                  {infos?.fonction}
                </Text>
                {!infos.from_structure && <Text
                  numberOfLines={1}
                  style={{
                    fontSize: TEXT_SIZES.CONTACT_CARD_DESCRIPTION,
                    color: COLORS.MAIN_BLUE,
                    fontFamily: FONTS.POPPINS_REGULAR,
                  }}>
                  {infos.organisation?.nom}
                </Text>}
                {infos.from_structure && <Text
                  numberOfLines={1}
                  style={{
                    //fontSize: 16,
                    color: '#102F8BFF',
                    fontFamily: 'Poppins-Regular',
                  }}>
                  {(infos.raison_sociale && infos.raison_sociale !== "") ? infos.raison_sociale :
                    infos.organisation.adresse_organisation?.ville}
                </Text>}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 10 }}>
                    {infos?.coordonnes?.telephone?.telephone_fixe && (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../components/assets/PICTO__TEL.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            marginBottom: 5,
                          }}
                        />
                        <Text style={styles.sectioncoordonnes}>
                          {infos?.coordonnes?.telephone?.telephone_fixe}
                        </Text>
                      </View>
                    )}
                    {infos?.coordonnes?.telephone?.telephone_portable && (
                      <View style={{ flexDirection: 'row' }}>
                        <Image
                          source={require('../../components/assets/PICTO__TEL.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            marginBottom: 5,
                          }}
                        />
                        <Text style={styles.sectioncoordonnes}>
                          {infos?.coordonnes?.telephone?.telephone_portable}
                        </Text>
                      </View>
                    )}
                    {infos?.coordonnes?.email && (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={require('../../components/assets/PICTO__MAIL.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 5,
                            marginBottom: 5,
                          }}
                        />
                        <Text style={styles.sectioncoordonnes}>
                          {infos?.coordonnes?.email}
                        </Text>
                      </View>

                    )}

                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  {(infos?.reseausociaux[1].url) && <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginRight: 5,
                    }}
                    onPress={() =>
                      Linking.openURL(infos?.reseausociaux[1].url)
                    }>
                    <Image
                      source={require('../../components/assets/PICTO__LINKEDIN.png')}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>}
                  {(infos?.reseausociaux[0].url) && <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      Linking.openURL(infos?.reseausociaux[0].url)
                    }>
                    <Image
                      source={require('../../components/assets/PICTO__TWITTER.png')}
                      style={{ width: 30, height: 30 }}
                    />
                  </TouchableOpacity>}
                </View>
              </View>
              <View style={styles.container}>
                {infos?.expertises?.length > 0 && <Accordion title={title1}>{expertise}</Accordion>}
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                <Accordion title={title2}>
                  <View style={{ marginTop: -17 }}>
                    <RenderHtml
                      source={{
                        html: `     
                          <div style="font-family: 'Poppins-Regular';color:${COLORS.MAIN_BLUE};line-height:20px;">
                          <p style="">
                          ${infos?.presentation}
                          </p>
                          </div>          
                        `}}
                      contentWidth={width}
                      systemFonts={['Poppins-Regular']}
                    />
                  </View>

                </Accordion>
                <View
                  style={{
                    backgroundColor: '#00A7D5',
                    alignItems: 'center',
                    padding: 0.5,
                  }}>
                  <View style={styles.divider} />
                </View>
                {infos?.centreinterets?.length > 0 && <Accordion title={title3}>{Centreinterets}</Accordion>}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profil;

export const Wrapper = styled.View`
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-direction: column;
`;
export const Logo = styled.Image`
  max-width: 100px;
  width: 100px;
  height: 100px;
`;
export const TextDescription = styled.Text`
  letter-spacing: 3;
  color: #f4f4f4;
  text-align: center;
  text-transform: uppercase;
`;
export const ButtonWrapper = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
export const Title = styled.Text`
  color: #f4f4f4;
  margin: 15% 0px 2px;
  font-size: 17;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 3;
  margin-bottom: -20px;
`;
const StyledButton = styled.TouchableHighlight`
 width:250px;
 background-color:${props => (props.transparent ? 'red' : 'red')};
 padding:15px;
border:${props => (props.transparent ? '1px solid #f3f8ff ' : 0)}
 justify-content:center;
 margin-bottom:20px;
 border-radius:24px
`;
StyledTitle = styled.Text`
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3;
  color: '#fff';
`;

export const Button = ({ onPress, color, ...props }) => {
  return (
    <StyledButton {...props}>
      <StyledTitle {...props}>{props.title}</StyledTitle>
    </StyledButton>
  );
};

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
    fontSize: 15,
    height: 25,
    color: '#00c3ff',
  },
  sectionDescription: {
    fontFamily: 'Poppins-Regular',
    color: '#271d67',
    textAlign: 'justify',
    marginBottom: 2,
    fontSize: TEXT_SIZES.PARAGRAPH
   },
  sectioncoordonnes: {
    marginTop: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: TEXT_SIZES.PARAGRAPH,
    color: '#271d67',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.1,
    width: '100%',
  },
});
