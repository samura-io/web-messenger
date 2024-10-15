import AuthApi from '../../api/AuthApi';
import { ApiError } from '../../api/BaseApi';
import { router } from '../../App';
import Block from '../../framework/Block';
import Validation from '../../utils/validation';
import Button from '../Button/Button';
import Input from '../Input/Input';

class LoginForm extends Block {
  submitButton: Button;

  constructor() {
    super({
      LoginInput: new Input({
        label: 'Логин',
        type: 'text',
        name: 'login',
        value: '',
        required: true,
        onlyStandartValidate: true,
      }),
      PasswordInput: new Input({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        value: '',
        required: true,
        onlyStandartValidate: true,
      }),
      SubmitButton: new Button({
        label: 'Войти',
        type: 'primary',
        formType: 'submit',
        id: 'goToMain',
      }),
      ToLoginButton: new Button({
        label: 'Нет аккаунта?',
        type: 'link',
        formType: 'button',
        id: 'noAccount',
        onClick: () => {
          router.go('/sign-up');
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
    const validation = new Validation('LoginForm');
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
      await AuthApi.signIn({
        data: fieldsData,
      });
      
      router.go('/messenger');
    } catch (e) {
      let errorMessage = '';

      const error = e as ApiError;
      if (error.status === 401) {
        errorMessage = 'Неверные имя пользователя или пароль';
      } else {
        errorMessage = 'Произошла ошибка, попробуйте позже';
      }

      this.setProps({
        errorMessage,
      });

      this.submitButton.setProps({
        disabled: false,
        label: 'Войти',
      });

      this.initValidation();
    }
  }
  
  render() {
    return `
        <form class="LoginForm" name="LoginForm" novalidate>
            <div class="LoginForm__content">
                <span class="LoginForm__title">Вход</span>
                    {{{ LoginInput }}}
                    {{{ PasswordInput }}}
                <div class="LoginForm__footer">
                    {{#if errorMessage}}
                      <span class="LoginForm__error">{{errorMessage}}</span>
                    {{/if}}
                    {{{ SubmitButton }}}
                    {{{ ToLoginButton }}}
                </div>
            </div>
        </form>      
      `;
  }
}

export default LoginForm;
