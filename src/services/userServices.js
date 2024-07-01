import axios from 'axios';
import apiUrls from '../../apiUrls';

export const userServices = {
  login: async (email, password) => {
    const response = await axios.post(apiUrls.login, {
      email,
      password,
    });
    return response;
  },

  creatRendezvous: async (data, token, eventId) => {
     const response = await axios.post(`${apiUrls.baseParticipant}/${eventId}/programmes`,
      data, { headers: {  Authorization: `JWT ${token}` }},
    );
    return response;
  },

  updatStatNotification: async (data, token, Idnotif) => {
    const response = await axios.patch(
      `${apiUrls.baseNotification}/${Idnotif}`,
      {
        etat: data.etat,
      },
      {
        headers: {
          Authorization: `JWT ${token}`,
        },
      },
    );

    return response;
  },

  getParticipant: async (id, token) => {
    const response = await axios.get(
      `${apiUrls.baseParticipant}/${id}`,
      {headers: {Authorization: `JWT ${token}`}},
    );

    return response.data;
  },

  getPrograms: async (id, token) => {
    const response = await axios.get(
      `${apiUrls.baseProgram}/`,
      {headers: {Authorization: `JWT ${token}`}},
    );
    return response.data;
  },

  getEvenements: async accessToken => {
    /* console.log('event data request', {
      url: apiUrls.baseEvent,      
    }) */
    const {data} = await axios.get(
      apiUrls.baseEvent,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    console.log('data gotten', data);
    return data;
  },

  getEventPrograms: async (eventId, accessToken) => {
    const {data} = await axios.get(
      // `${apiUrls.baseEvent}/${eventId}`,
      `${apiUrls.baseEvent}/${eventId}/programmes`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return data;
  },

  getMaJournee: async (eventId, accessToken) => {
    const response = await axios.get(
      `${apiUrls.baseParticipant}/${eventId}/programmes`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },

  getDetailProgramme: async (programId, accessToken) => {
    const response = await axios.get(
      `${apiUrls.baseProgram}/${programId}`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },

  getExposants: async (eventId, accessToken) => {
    try {
      const {data} = await axios.get(
        `${apiUrls.baseUrl}/api/evenement/${eventId}/exposant?type=premium`,
        {headers: {Authorization: `JWT ${accessToken}`}},
      );
      return data;
    } catch (error) {
      console.log('error from participants list', error);
      return [];
    }
  },

  getDetailParticipants: async (eventId, accessToken,id_participant) => {
    try {
      const response = await axios.get(
        `${apiUrls.baseParticipant}/${id_participant}`,
        {headers: {Authorization: `JWT ${accessToken}`}},
      );
      return response.data;
    } catch (error) {
      console.log('error from participants list', error);
      return [];
    }
  },

  getNotifications: async accessToken => {
    const response = await axios.get(
      `${apiUrls.baseNotification}`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },

  updateUserInfos: async (data, token) => {
    let bodyFormData = new FormData();

    bodyFormData.append('presentation', data.presentation);
    bodyFormData.append(
      'linkedin_social_networks',
      data.linkedin_social_networks,
    );
    bodyFormData.append(
      'twitter_social_networks',
      data.twitter_social_networks,
    );

    if (data.photo) {
      bodyFormData.append('photo', data.photo);
    }

    const response = await axios.post(
      `${apiUrls.baseParticipant}/${data.user_id}/update`,
      bodyFormData,
      {
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  },
};
