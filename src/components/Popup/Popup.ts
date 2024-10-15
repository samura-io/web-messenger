import Block from '../../framework/Block';
import ChangeAvatar from '../ChangeAvatar/ChangeAvatar';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

type TPopupProps = {
  login?: boolean,
  register?: boolean,
  changeAvatar?: boolean,
  isEnableOverlay?: boolean,
  onClose?: (value: boolean) => void;
};

class Popup extends Block {
  overlay: Element | null = null;

  constructor(props: TPopupProps) {
    super({
      LoginForm: new LoginForm(),
      RegisterForm: new RegisterForm(),
      ChangeAvatar: new ChangeAvatar({
        onFinish: () => {
          this.handleClosePopup();
        },
      }),
      login: props.login,
      register: props.register,
      changeAvatar: props.changeAvatar,
      isEnableOverlay: props.isEnableOverlay,
      onClose: props.onClose,
    });
  }

  componentDidMount(): void | (() => void) {
    this.overlay = this.createRef('PopupOverlay');
    
    if (this.overlay) {
      this.overlay.addEventListener('click', this.handleClosePopup );
    }

    return () => {
      if (this.overlay) {
        this.overlay.removeEventListener('click', this.handleClosePopup);
      }
    };
  }

  handleClosePopup = (e?: Event) => {
    if (this.props.onClose && e?.target === e?.currentTarget) {
      (this.props.onClose as (value: boolean) => void)(true);
    }
    if (!e) {
      (this.props.onClose as (value: boolean) => void)(true);
    }
  };
  
  render() {
    return `
            <div a
                class="Popup__overlay
                {{#if isEnableOverlay}} Popup__overlay_isEnableOverlay {{/if}}"
                id="PopupOverlay"
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
