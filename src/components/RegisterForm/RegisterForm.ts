import AuthApi from '../../api/AuthApi';
import { ApiError } from '../../api/BaseApi';
import { router } from '../../App';
import Block from '../../framework/Block';
import Validation from '../../utils/validation';
import Button from '../Button/Button';
import Input from '../Input/Input';

class RegisterForm extends Block {
  submitButton: Button;

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
      SubmitButton: new Button({
        label: 'Зарегистрироваться',
        type: 'primary',
        formType: 'submit',
        id: 'goToMain',
      }),
      ToRegisterButton: new Button({
        label: 'Войти',
        type: 'link',
        formType: 'button',
        id: 'goToLogin',
        onClick: () => {
          router.go('/');
        },
      }),
      errorMessage: '',
      loading: false,
    });

    this.submitButton = this.children.SubmitButton;
  }

  componentDidMount(): void {
    this.initValidation();
  }

  initValidation() {
    const validation = new Validation('RegisterForm');
    const form = validation.form;
    form?.addEventListener('validationSuccess', this.handleValidSubmit.bind(this) as unknown as EventListener);
  }

  async handleValidSubmit(event: CustomEvent) {

    this.setProps({
      loading: true,
      errorMessage: '',
    });

    this.submitButton.setProps({
      disabled: true,
      label: 'Загрузка...',
    });

    const fieldsData = event.detail.fields;
    
    try {
      await AuthApi.signUp({
        data: fieldsData,
      });
      
      router.go('/messenger');
    } catch (e) {
      let errorMessage = '';

      const error = e as ApiError;
      if (error.status === 409) {
        errorMessage = 'Пользователь с таким логином или почтой уже существует';
      } else {
        errorMessage = 'Произошла ошибка, попробуйте позже';
      }

      this.setProps({
        errorMessage,
      });

      this.submitButton.setProps({
        disabled: false,
        label: 'Зарегистрироваться',
      });

      this.initValidation();
    }
  }
  
  render() {
    return `
        <form class="RegisterForm" name="RegisterForm" novalidate>
            <div class="RegisterForm__content">
                <span class="RegisterForm__title">Регистрация</span>
                    {{{ InputList }}}
                <div class="RegisterForm__footer">
                    {{#if errorMessage}}
                      <span class="LoginForm__error">{{errorMessage}}</span>
                    {{/if}}
                    {{{ SubmitButton }}}
                    {{{ ToRegisterButton }}}
                </div>
            </div>
        </form>   
      `;
  }
}

export default RegisterForm;
