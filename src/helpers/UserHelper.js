import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserProfil} from '../redux/reducers/UserReducers';
import {isEmpty, upperFirst, upperCase} from 'lodash';

class UserHelper {
  async setStorage(user) {
    await AsyncStorage.setItem('@USER',JSON.stringify(user) );
  }

  async getStorage() {
    let response = null;
    const value = await AsyncStorage.getItem('@USER');
    if (!isEmpty(value)) {
      response = JSON.parse(value);
    }
    return response;
  }

  isConnected(user) {
    if (user === null) {
      return false;
    }
    return true;
  }

  isVerified(user) {
    return user.status === 'CONNECTED';
  }
  async getLocalRefreshToken() {
    const user = await JSON.parse(AsyncStorage.getItem("@USER"));
    return user?.refreshToken;
  }

  async getLocalAccessToken() {
    const user = await JSON.parse(AsyncStorage.getItem("@USER"));
    return user?.access;
  }

 async updateLocalAccessToken(token) {
    let user = await JSON.parse(AsyncStorage.getItem("@USER"));
    user.access = token;
    AsyncStorage.setItem("@USER", JSON.stringify(user));
  }

}
export default new UserHelper();
