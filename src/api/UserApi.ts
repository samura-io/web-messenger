import { TOptopns } from '../utils/HTTPTransport';
import { BASE_URL } from '../variables';
import BaseApi from './BaseApi';

class UserAPI extends BaseApi {

  constructor() {
    super(`${BASE_URL}/user/`);
  }
    
  changeProfile(request: TOptopns) {
    return this.http.put('profile', request);
  }
 
  changeAvatar(request: TOptopns) {
    return this.http.put('profile/avatar', request);
  }

  changePassword(request: TOptopns) {
    return this.http.put('password', request);
  }

  search(request: TOptopns) {
    return this.http.post('search', request);
  }

}

export default new UserAPI;
