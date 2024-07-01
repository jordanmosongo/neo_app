import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { MaiLoaderComponent } from '../../components/loaders/MainLoader';
import { ManageStatusComponent } from '../../components/ManageStatusComponent';
import axios from 'axios';
import apiUrls from '../../../apiUrls';

const QrCode = () => {
  const [image, setImage] = React.useState(null);
  const [responseError, setResponseError] = useState(null);
  const [responseResult, setResponseResult] = useState(null);
  const [nbreOfRepetitions, setNbreOfRepetitions] = useState(0);

  const { tokens } = useSelector((state) => state.user);

  const fetchDetailParticipant = async () => {
    try {
      const { participant_id } = jwt_decode(tokens.access);
      const { data } = await axios.get(`${apiUrls.baseParticipant}/${participant_id}`, {
        headers: { Authorization: `JWT ${tokens.access}` }
      })
      setResponseResult(data);
      if (data.qr_code !== "") {
        setImage(data.qr_code.image)
      }
    } catch (error) {
      setResponseError(error);
    }
  }

  useEffect(() => {
    (async () => await fetchDetailParticipant())();
  }, []);

  return (
    <>
      {responseResult ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.WHITE }}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 250,
              height: 250,
            }}
          />
        ) : <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}><Text style={{
          fontFamily: FONTS.POPPINS_MEDIUM,
          fontSize: SIZES.font,
          color: COLORS.MAIN_BLUE
        }}>Vous n'avez pas code QR.</Text></View>}
      </View> : <MaiLoaderComponent />}
      {((responseError?.request || responseError?.response) && !responseResult) && (
        <ManageStatusComponent
          error={responseError}
          nbreOfRepetitions={nbreOfRepetitions}
          isStatusError={true}
          handleActionOnError={async () => {
            await fetchDetailParticipant();
            setNbreOfRepetitions((prevState) => prevState + 1);
          }}
        />)}
    </>
  );
};

export default QrCode;

