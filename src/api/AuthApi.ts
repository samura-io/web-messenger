import { TOptopns } from '../utils/HTTPTransport';
import { BASE_URL } from '../variables';
import BaseApi from './BaseApi';

class AuthAPI extends BaseApi {

  constructor() {
    super(`${BASE_URL}/auth/`);
  }
    
  signUp(request: TOptopns) {
    return this.http.post('signup', request);
  }

  signIn(request: TOptopns) {
    return this.http.post('signin', request);
  }

  logout() {
    return this.http.post('logout', {});
  }

  getUser() {
    return this.http.get('user');
  }

}

export default new AuthAPI;
