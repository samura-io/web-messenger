import UserApi from '../api/UserApi';
import store from '../framework/Store';

// type UserModel = {
//   name: string;
// };

const userApi = new UserApi();

class UserController {

  public getUser() {
    try {
      const user =  userApi.request();
      store.set('user', user);
    } catch (e) {
      console.error(e);
    } 
  }

}

export default UserController;
