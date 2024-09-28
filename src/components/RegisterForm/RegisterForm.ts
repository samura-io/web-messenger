import Block from '../../utils/Block';
import Button from '../Button/Button';
import Input from '../Input/Input';

class RegisterForm extends Block {
    constructor() {
      super({
        InputList: [
            new Input({
                label: 'Почта',
                type: 'email',
                name: 'email',
                value: '',
                placeholder: 'example@ex.com',
                required: true,
            }),
            new Input({
                label: 'Логин',
                type: 'text',
                name: 'login',
                value: '',
                required: true,
                minLength: 3,
                maxLength: 20,
            }),
            new Input({
                label: 'Имя',
                type: 'text',
                name: 'first_name',
                value: '',
                required: true,
                minLength: 2,
                maxLength: 30,
            }),
            new Input({
                label: 'Фамилия',
                type: 'text',
                name: 'second_name',
                value: '',
                required: true,
                minLength: 3,
                maxLength: 40,
            }),
            new Input({
                label: 'Телефон',
                type: 'tel',
                name: 'phone',
                value: '',
                required: true,
                placeholder: '+79998887766',
                maxLength: 15,
                minLength: 10,
            }),
            new Input({
                label: 'Пароль',
                type: 'password',
                name: 'password',
                value: '',
                required: true,
                minLength: 8,
                maxLength: 40,
            }),
            new Input({
                label: 'Пароль (ещё раз)',
                type: 'password',
                name: 'repeat-password',
                value: '',
                required: true,
                minLength: 8,
                maxLength: 40,
            }),
        ],
        ButtonList: [
            new Button({
                label: 'Зарегистрироваться',
                type: 'primary',
                formType: 'submit',
                id: 'goToMain',
            }),
            new Button({
                label: 'Войти',
                type: 'link',
                formType: 'button',
                id: 'goToLogin',
            }),
        ],
      });
    }
  
    render() {
      return `
        <form class="RegisterForm" name="RegisterForm" novalidate>
            <div class="RegisterForm__content">
                <span class="RegisterForm__title">Регистрация</span>
                    {{{ InputList }}}
                <div class="RegisterForm__footer">
                    {{{ ButtonList }}}
                </div>
            </div>
        </form>   
      `
    }
}

export default RegisterForm;