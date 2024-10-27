import AuthApi from '../api/AuthApi';
import store from '../framework/Store';

class AuthController {

  static async getUser(storeOption: { store: 'on' | 'off' } = { store: 'on' }) {
    try {
      const data = await AuthApi.getUser();
      const userData = JSON.parse(data.response);

      if (storeOption.store !== 'off') {
        store.set('user', userData);
      }

      return data;
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
