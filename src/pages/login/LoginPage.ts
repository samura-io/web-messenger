import Block from '../../framework/Block';
import Popup from '../../components/Popup/Popup';
import LoginForm from '../../components/LoginForm/LoginForm';
import withAuth from '../../utils/withAuth';

class LoginPage extends Block {
  constructor() {
    super({
      Popup: new Popup({
        login: true,
        open: true,
        disableOverlay: true,
        component: LoginForm,
      }),
    });
  }
  
  render() {
    return `
          <main class="LoginPage">
            {{{ Popup }}}
          </main>
        `;
  }
}

export default withAuth(LoginPage);
