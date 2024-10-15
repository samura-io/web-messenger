import { TOptopns } from '../utils/HTTPTransport';
import BaseApi from './BaseApi';

class UserAPI extends BaseApi {

  constructor() {
    super('https://ya-praktikum.tech/api/v2/user/');
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
