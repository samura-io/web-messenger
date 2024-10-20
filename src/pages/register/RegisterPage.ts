import Block from '../../framework/Block';
import Popup from '../../components/Popup/Popup';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
// import withAuth from '../../utils/withAuth';

class RegisterPage extends Block {
  constructor() {
    super({
      Popup: new Popup({
        login: true,
        open: true,
        disableOverlay: true,
        component: RegisterForm,
      }),
    });
  }
  
  render() {
    return `
          <main class="RegisterPage">
              {{{ Popup }}}
          </main>
        `;
  }
}

// export default withAuth(RegisterPage);
export default RegisterPage;
