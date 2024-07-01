/* eslint-disable prettier/prettier */
import axios from "axios";
//import authServiceApi from "./authService";
//import createAuthRefreshInterceptor from 'axios-auth-refresh';
import config from "./config";
import { isEmpty } from 'lodash';
import UserHelper from "../helpers/UserHelper";

const http = axios.create({
  baseURL: config.URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

const CancelToken = axios.CancelToken;
const setAuthHeader = async (config: any) => {
const token = await UserHelper.getToken();
  if (!isEmpty(token)) {
    config.headers["Authorization"] = "Bearer " + token;
  } else {
    config.cancelToken = new CancelToken((cancel) => cancel("No token"));
  }
  return config;
};

http.interceptors.request.use(setAuthHeader);

/*createAuthRefreshInterceptor(http, (failedRequest) =>
    authServiceApi.refreshToken().then((result) => {
        if (result === true) {
            setAuthHeader(failedRequest.response.config);
            return Promise.resolve();
        }
        const refreshToken = authServiceApi.getRefreshToken();
        if (refreshToken) {
            message.error('Votre session a expiré, veuillez vous reconnecter');
        }
        const disconnectElem = document.querySelector('.disconnect');
        if (disconnectElem) {
            disconnectElem.click();
        }
        return Promise.reject(`${refreshToken ? 'Expired' : 'No'} refresh token`);
    }),
);*/

export default http;
