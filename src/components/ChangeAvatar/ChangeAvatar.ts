import UserController from '../../controllers/UserController';
import Block, { Props } from '../../framework/Block';
import connect from '../../utils/connect';
import Button from '../Button/Button';
import FileInput from '../FileInput/FileInput';

type TChangeAvatarProps = {
  onFinish?: () => void;
};

class ChangeAvatar extends Block {
  submitButton: Button;

  constructor(props: TChangeAvatarProps) {
    super({
      SubmitButton: new Button({
        label: 'Поменять',
        type: 'primary',
        formType: 'submit',
        id: 'submit',
        disabled: true,
      }),
      CancelButton: new Button({
        label: 'Отмена',
        type: 'link',
        formType: 'button',
        onClick: () => {
          if (props.onFinish) {
            props.onFinish();
          }
        },
      }),
      events: {
        submit: (event: Event) => {
          this.handleSubmitChangeAvatar(event);
        },
      }, 
      FileInput: new FileInput({
        id: 'file',
        name: 'avatar',
        type: 'file',
        accept: 'image/*',
        onChange: (event: Event) => {
          this.handleChangeFile(event);
        },
      }),
      label: 'Выбрать файл',
      hasFile: false,
      ...props,
    });

    this.submitButton = this.children.SubmitButton;
  }

  handleChangeFile(e: Event) {
    const fileName = (e.target as HTMLInputElement).files?.item(0)?.name;
    if (fileName) {
      this.setProps({
        label: fileName,
        hasFile: true,
      });
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.hasFile !== newProps.hasFile) {
      this.submitButton.setProps({ disabled: !newProps.hasFile });
    }

    if (oldProps.isClose !== newProps.isClose) {
      this.setProps({ isClose: newProps.isClose });
    }
    return true;
  }

  async handleSubmitChangeAvatar(event: Event) {
    this.submitButton.setProps({ disabled: true, label: 'Загрузка...' });

    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    try {
      await UserController.changeAvatar(formData);

      if (this.props.onFinish) {
        (this.props.onFinish as () => void)();
      }
    } catch (error) {
      console.error(error);
    }
    this.submitButton.setProps({ disabled: true, label: 'Поменять' });

    target.reset();
  }
      
  
  render() {
    return `
        <form class="ChangeAvatar">
            <span class="ChangeAvatar__title">Загрузите файл</span>
            <div class="ChangeAvatar__contentWrapper">
            <label for="file" class="ChangeAvatar__label">{{{label}}}</label>
            {{{FileInput}}}
            </div>
            <span class="ChangeAvatar__error">{{ user.formDataError }}</span>
            {{{SubmitButton}}}
            {{{CancelButton}}}
        </form>   
      `;
  }
}

const withUser = connect(state => ({ user: state.user }));
export default withUser(ChangeAvatar);
