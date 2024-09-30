import Block from '../../framework/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';

class LoginForm extends Block {
  constructor() {
    super({
      InputList: [
        new Input({
          label: 'Логин',
          type: 'text',
          name: 'login',
          value: '',
          required: true,
          onlyStandartValidate: true,
        }),
        new Input({
          label: 'Пароль',
          type: 'password',
          name: 'password',
          value: '',
          required: true,
          onlyStandartValidate: true,
        }),
      ],
      ButtonList: [
        new Button({
          label: 'Войти',
          type: 'primary',
          formType: 'submit',
          id: 'goToMain',
        }),
        new Button({
          label: 'Нет аккаунта?',
          type: 'link',
          formType: 'button',
          id: 'noAccount',
        }),
      ],
    });
  }
  
  render() {
    return `
        <form class="LoginForm" name="LoginForm" novalidate>
            <div class="LoginForm__content">
                <span class="LoginForm__title">Вход</span>
                    {{{ InputList }}}
                <div class="LoginForm__footer">
                    {{{ ButtonList }}}
                </div>
            </div>
        </form>      
      `;
  }
}

export default LoginForm;