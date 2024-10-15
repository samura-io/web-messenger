import Block from '../../framework/Block';
import Popup from '../../components/Popup/Popup';

class RegisterPage extends Block {
  constructor() {
    super({
      Popup: new Popup({
        register: true,
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

export default RegisterPage;
