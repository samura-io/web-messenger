import Block from '../../utils/Block';
import Popup from '../../components/Popup/Popup';
import Validation from '../../utils/validation';

class RegisterPage extends Block {
    constructor() {
      super({
        Popup: new Popup({
          register: true,
        }),
      });
    }

    componentDidMount() {
      const validation = new Validation('RegisterForm');
      const form = validation.form;
      form?.addEventListener('validationSuccess', this.handleValidSubmit.bind(this) as EventListener);
      
    }

    handleValidSubmit(event: CustomEvent){
      const fieldsData = event.detail.fields;
      console.log(`Отправляем данные регистрации: ${JSON.stringify(fieldsData)}`);
    }
  
    render() {
        return `
          <main class="RegisterPage">
              {{{ Popup }}}
          </main>
        `
    }
}

export default RegisterPage;