import axios from 'axios';
import http from './config';
import apiUrls from '../../apiUrls';

export const AllServices = {
  SendMessage: async (data, token) => {
    try {
      const response = await axios.post(
        `${apiUrls.contactBase}`,
        {
          message: data.message,
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response;
    } catch (error) {
      console.log('error from service ', response);
    }
  },

  getpushNotification: async token => {
    try {
      const response = await axios.post(
        `${apiUrls.pushNotificationBase}`,
        {
          typeapp: 'MOBILE',
          token:
            'da9YN6v4SVmjTkMXl_30_1:APA91bHmmjV6joqQ00YDxy7l-M0E44NwlMeqvBmXaKX4hwQPNG9Cw4PmsB5KdrmhFc_-K5fVq4LXux_ucMqAn3JoGT9VVgLpipwQD5dBz1QAwkIzUWyVHbMkK7e0dDqpjNfwFq9EGhpT',
        },
        {
          headers: {
            Authorization: `JWT ${token}`,
            // 'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response;
    } catch (error) {
      console.log('error from service ', response);
    }
  },

  getConfigurations: async accessToken => {
    const response = await axios.get(
      `${apiUrls.apiBase}/configurations`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },
  getConfigurqtion_Login: async accessToken => {
    const response = await axios.get(
      apiUrls.pageConfigurationBase,
      //{headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },

  getEventLogo: async (eventId, accessToken) => {
    const response = await axios.get(
      `${apiUrls.baseEventExposant}/${eventId}/exposant?type=premium`,
      {headers: {Authorization: `JWT ${accessToken}`}},
    );
    return response.data;
  },
};

//
class LoginService{

  getAll(){
      return http.get(`/configurations-pages`)
  }

}
export default new LoginService()
