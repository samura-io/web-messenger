import AuthApi from '../api/AuthApi';
import store from '../framework/Store';

class AuthController {

  static async getUser() {
    try {
      const data = await AuthApi.getUser();
      const userData = JSON.parse(data.response);
      store.set('user', userData);
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      await AuthApi.logout();
    } catch (error) {
      throw error;
    }
  }

}

export default AuthController;
