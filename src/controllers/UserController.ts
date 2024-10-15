import UserApi from '../api/UserApi';
import store from '../framework/Store';
import { TOptopns } from '../utils/HTTPTransport';

class UserController {

  static async changeProfile(options: TOptopns) {
    store.set('user', {
      loading: true,
      errorMessage: '',
    });
    try {
      const data = await UserApi.changeProfile({ data: options });
      const userData = JSON.parse(data.response);
      store.set('user', { loading: false, ...userData });
    } catch (error) {
      store.set('user', { loading: false, errorMessage: 'Произошла ошибка, попробуйте позже' });
      throw error;
    }
  }

  static async changePassword(options: TOptopns) {
    store.set('user', {
      loading: true,
      errorMessage: '',
    });
    try {
      await UserApi.changePassword({ data: options });
      store.set('user', { loading: false });
    } catch (error) {
      console.log(error);
      const reason = JSON.parse((error as XMLHttpRequest)?.response);
      console.log(reason);
      if (reason.reason === 'Password is incorrect') {
        console.log('Неверный пароль');
        store.set('user', { loading: false, errorMessage: 'Неверный пароль' });
      } else {
        store.set('user', { loading: false, errorMessage: 'Произошла ошибка, попробуйте позже' });
      }

      throw error;
    }
  }

  static async changeAvatar(options: FormData) {
    store.set('user', {
      loading: true,
      formDataError: '',
    });
    try {
      const data = await UserApi.changeAvatar({ data: options, isFile: true });
      const userData = JSON.parse(data.response);
      store.set('user', { loading: false, ...userData });
    } catch (error) {
      store.set('user', { loading: false, formDataError: 'Произошла ошибка, попробуйте позже' });
      throw error;
    }
  }

}

export default UserController;
