import UserHelper from "../helpers/UserHelper";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://noebo1.kanieba.com/token",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  instance.interceptors.request.use(
    (config) => {
      const token = UserHelper.getLocalAccessToken();
      if (token) {
        // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
        config.headers["access"] = token; // for Node.js Express back-end
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
  
      if (originalConfig.url !== "http://noebo1.kanieba.com/token" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
  
          try {
            const rs = await instance.post("http://noebo1.kanieba.com/token/refresh", {
              refresh: UserHelper.updateLocalAccessToken(),
            });
  
            const { accessToken } = rs.data;
            UserHelper.updateLocalAccessToken(accessToken);
  
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
  
      return Promise.reject(err);
    }
  );
  
  export default instance;