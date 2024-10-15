import { TOptopns } from '../utils/HTTPTransport';
import BaseApi from './BaseApi';

class AuthAPI extends BaseApi {

  constructor() {
    super('https://ya-praktikum.tech/api/v2/auth/');
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
