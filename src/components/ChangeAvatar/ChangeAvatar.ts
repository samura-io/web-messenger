import Block from '../../framework/Block';
import Button from '../Button/Button';
import FileInput from '../FileInput/FileInput';

type TChangeAvatarProps = {
  submitChangeAvatar?: (event: Event, form: HTMLFormElement) => void;
};

class ChangeAvatar extends Block {
  constructor(props: TChangeAvatarProps) {
    super({
      SubmitButton: new Button({
        label: 'Поменять',
        type: 'primary',
        formType: 'submit',
        id: 'submit',
      }),
      DisabledButton: new Button({
        label: 'Поменять',
        type: 'primary',
        formType: 'submit',
        id: 'submit',
        disabled: true,
      }),
      events: {
        submit: (event: Event) => {
          if (props.submitChangeAvatar) {
            props.submitChangeAvatar(event, event.target as HTMLFormElement);
          }
          this.handleResetToInit();
        },
      }, 
      FileInput: new FileInput({
        id: 'file',
        name: 'file',
        type: 'file',
        accept: 'image/*',
        onChange: (event: Event) => {
          this.handleChangeFile(event);
        },
      }),
      label: 'Выбрать файл на компьютере',
      hasFile: false,
    });
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

  handleResetToInit() {
    this.setProps({ 
      label: 'Выбрать файл на компьютере',
      hasFile: false,
    });
  }
      
  
  render() {
    return `
        <form class="ChangeAvatar">
            <span class="ChangeAvatar__title">Загрузите файл</span>
            <div class="ChangeAvatar__contentWrapper">
            <label for="file" class="ChangeAvatar__label">{{{label}}}</label>
            {{{FileInput}}}
            </div>
            {{#if hasFile }}
            {{{SubmitButton}}}
            {{else}}
            {{{DisabledButton}}}
            {{/if}}
        </form>   
      `;
  }
}

export default ChangeAvatar;