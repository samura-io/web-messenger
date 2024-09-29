import Block from '../../framework/Block';
import Popup from '../../components/Popup/Popup';
import Validation from '../../utils/validation';

class LoginPage extends Block {
    constructor() {
      super({
        Popup: new Popup({
          login: true,
        }),
      });
    }

    componentDidMount(): void {
      const validation = new Validation('LoginForm');
      const form = validation.form;
      form?.addEventListener('validationSuccess', this.handleValidSubmit.bind(this) as EventListener);

    }

    handleValidSubmit(event: CustomEvent){
        const fieldsData = event.detail.fields;
        console.log(`Отправляем данные входа: ${JSON.stringify(fieldsData)}`);
    }
  
    render() {
        return `
          <main class="LoginPage">
            {{{ Popup }}}
          </main>
        `
    }
}

export default LoginPage;
