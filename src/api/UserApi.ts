import { BaseApi } from './BaseApi';

class UserApi extends BaseApi {
  request() {

    // тут представим какой-то запрос к серверу, который возвращает:
    return {
      email: 'sGvGq@example.com',
      login: 'nikita',
      firstName: 'Никита',
      secondName: 'Иванов',
      displayName: 'Никита Иванов',
      phone: '+7 (999) 999-99-99',
    };
  }
}

export default UserApi;
