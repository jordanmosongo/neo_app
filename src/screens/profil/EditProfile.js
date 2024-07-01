import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setParticipantInfos } from '../../store/userSlice';
import { Avatar } from '@rneui/base';
import { Icon } from 'react-native-elements';

// import { launchImageLibrary } from 'react-native-image-picker';
import { Helpers } from '../../helpers/helpers';
import { userServices } from '../../services/userServices';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { BackNavigation } from '../../components/buttons/back/BackNavigation';
import MainButton from '../../components/buttons/main/MainButton';
import { DetailHeader } from '../../components/header/main/DetailHeader';
import { COLORS } from '../../constants/theme';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import { AlertModal } from '../../components/modals/alert/AlertModal';
import { MainHeader } from '../../components/header/main/MainHeader';

const EditProfile = () => {
  const { tokens, infos } = useSelector(state => state.user);
  const navigation = useNavigation();

  const [presentation, setPresentation] = useState(infos.presentation);
  const [image, setImage] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);
  const [alertInfo, setAlertInfo] = useState({
    visible: false,
    title: 'Titre',
    message: 'message'
  });

  // console.log('infos', infos.reseausociaux);

  const [linkedinUrl, setLinkedinUrl] = useState(
    infos.reseausociaux.filter(value => value && value.nom === 'twi')[0].url,
  );
  const [twitterUrl, setTwitterUrl] = useState(
    infos.reseausociaux.filter(value => value && value.nom === 'link')[0].url,
  );

  const [saveLoading, setSaveLoading] = useState(false);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const dispatch = useDispatch();
  const richText = React.useRef();

  const handleUpdate = async () => {
    setSaveLoading(true);
    setUpdateError(false);
    setUpdateSuccess(false);
    setResponseResult(null);
    await userServices
      .updateUserInfos(
        {
          user_id: infos.id,
          presentation: presentation,
          photo:
            image !== null
              ? {
                name: image.fileName,
                type: image.type,
                uri:
                  Platform.OS === 'ios'
                    ? image.uri.replace('file://', '')
                    : image.uri,
              }
              : image,
          linkedin_social_networks: linkedinUrl,
          twitter_social_networks: twitterUrl,
        },
        tokens.access,
      )
      .then((res) => {
          setResponseResult(res.data);
          setAlertInfo({
            visible: true,
            title: 'Information',
            message: 'Votre profil est mis à jour avec succès !'
          })
          dispatch(setParticipantInfos(res.data));
          setSaveLoading(false);
        })
      .catch((error) => {
        setResponseError(error);
        setSaveLoading(false);
      })
   };

  const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>

  return (
    <>
      <MainHeader
       withTitle={true}
       title="Modifier mon profil" 
       noBackAction={true}
      /> 
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <View style={{ paddingHorizontal: 20, backgroundColor: '#fff' }}>
          <BackNavigation
            title={'Mon profil'}
            goBack={() => navigation.goBack()}
            paddingVertical={20}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
            <Avatar
              size={120}
              rounded
              source={{
                uri:
                  image !== null
                    ? `${image.uri}`
                    : `${Helpers.getPhotoUrl(infos?.photo)}`,
              }}>
              <Avatar.Accessory
                Component={() => (
                  <Icon
                    size={26}
                    color="#000"
                    name="camera-outline"
                    onPress={async () => {
                      // const result = await launchImageLibrary();
                      // if (!result.didCancel) {
                      //   setImage(result.assets[0]);
                      // }
                    }}
                    type="ionicon"
                  />
                )}
                size={40}
                style={{ backgroundColor: '#fff', marginTop: 1 }}
              />
            </Avatar>
          </View>
          <View
            style={{
              height: '100%',
            }}>
            <View style={{ margin: 20, gap: 10 }}>
              <Text style={styles.text}>Présentation</Text>
              <SafeAreaView>
                {/* <RichToolbar
                  editor={richText}
                  actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertLink, actions.insertOrderedList,
                    actions.insertBulletsList
                  ]}
                  iconMap={{ [actions.heading1]: handleHead }}
                  
                /> */}
                 <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    {/* <RichEditor
                      ref={richText}
                      initialContentHTML={presentation}
                      onChange={(text) => {
                        setPresentation(text);
                      }}
                      style={{                        
                        borderWidth: 1,
                        borderColor: COLORS.DARKGRAY,
                        minHeight: 40,
                      }}
                    /> */}
                  </KeyboardAvoidingView>
              </SafeAreaView>
            </View>
            <View style={styles.container}></View>

            <View style={{ margin: 20, gap: 10, marginTop: -5 }}>
              <Text style={styles.text}>Twitter</Text>
              <TextInput
                placeholder="Saisir le lien twitter"
                value={twitterUrl}
                style={{
                  borderWidth: 1,
                  paddingLeft: 20,
                  color: 'grey',
                  borderColor: 'grey', fontFamily: 'Poppins-Regular',
                }}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={value => setTwitterUrl(value)}
              />
            </View>

            <View style={{ margin: 20, gap: 10, marginTop: -5 }}>
              <Text style={styles.text}>Linkedin</Text>
              <TextInput
                placeholder="Saisir le lien linkedIn"              
                value={linkedinUrl}
                style={{
                  borderWidth: 1,
                  paddingLeft: 20,
                  color: 'grey',
                  borderColor: 'grey', 
                  fontFamily: 'Poppins-Regular',
                }}
                placeholderTextColor={COLORS.GRAY}
                onChangeText={value => setLinkedinUrl(value)}
              />
            </View>

            <View style={{ marginHorizontal: 30, marginTop: -20 }}>
              {updateError && (
                <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Regular', }}>
                  Une erreur est survenue lors de la sauvegarde, veuillez ressayer
                </Text>
              )}

              {updateSuccess && (
                <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold', fontFamily: 'Poppins-Regular', }}>
                  Sauvegarde effectuée avec succès
                </Text>
              )}

              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginVertical: 10,
                marginLeft: -10
              }}>
                <MainButton
                  label={'Modifier'}
                  icon={''}
                  verticalMargin={8}
                  loading={saveLoading}
                  radius={50}
                  padding={0}
                  marginRight={0}
                  withBorder={true}
                  color={COLORS.MAIN_RED}
                  txtColor="#fff"
                  handleClick={async () => await handleUpdate()}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            setResponseError(null);
          }}
        />)}
      <AlertModal
        isAlertVisible={alertInfo.visible}
        title={alertInfo.title}
        confirmMessage={alertInfo.message}
        closeAlert={() => {
          setAlertInfo((prevState) => ({...prevState, visible: false}));
        }}
      />
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  txt_btn: {
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 3,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 15,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 100,
    padding: 5,
    backgroundColor: '#FFFF',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
  },
  textarea: {
    textAlignVertical: 'top',
    fontSize: 14,
    color: 'grey', fontFamily: 'Poppins-Regular',
  },
});




