import Block from '../../framework/Block';
import Popup from '../../components/Popup/Popup';

class LoginPage extends Block {
  constructor() {
    super({
      Popup: new Popup({
        login: true,
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

export default LoginPage;
