import Router from './framework/Router';
import InternalErorPage from './pages/internal-error/internal-error';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/main';
import NotFoundPage from './pages/not-found/not-found';
import ProfilePage from './pages/profile/ProfilePage';
import RegisterPage from './pages/register/RegisterPage';

export const router = new Router('#app');

export default class App {
  state: { [key: string]: unknown };

  constructor() {
    this.state = {
      currentPage: '/',
      searchable: false,
    };

    router
      .use('/messenger', MainPage)
      .use('/', LoginPage)
      .use('/sign-up', RegisterPage)
      .use('/settings', ProfilePage)
      .use('*', NotFoundPage)
      .use('/internal-error', InternalErorPage)
      .start();
  }
}
