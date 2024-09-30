import Block from '../../framework/Block';
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

type TPopupProps = {
  login?: boolean,
  register?: boolean,
  changeAvatar?: boolean,
  isEnableOverlay?: boolean,
  submitChangeAvatar?: (event: Event, form: HTMLFormElement) => void
};

class Popup extends Block {
  constructor(props: TPopupProps) {
    super({
      LoginForm: new LoginForm(),
      RegisterForm: new RegisterForm(),
      ChangeAvatar: new ChangeAvatar({
        submitChangeAvatar: props.submitChangeAvatar,
      }),
      login: props.login,
      register: props.register,
      changeAvatar: props.changeAvatar,
      isEnableOverlay: props.isEnableOverlay,
    });
  }
  
  render() {
    return `
            <div 
                class="Popup__overlay 
                {{#if isEnableOverlay}} Popup__overlay_isEnableOverlay {{/if}}"
            >
                <div class="Popup Popup_open">
                  {{#if login}}
                      {{{ LoginForm }}}
                  {{/if}}
                  {{#if register}}
                      {{{ RegisterForm }}}
                  {{/if}}
                  {{#if changeAvatar}}
                      {{{ ChangeAvatar }}}
                  {{/if}}
                </div>
            </div>      
      `;
  }
}

export default Popup;