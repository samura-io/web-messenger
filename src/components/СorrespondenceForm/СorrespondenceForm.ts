import Block, { Props } from '../../utils/Block';
import ClassicInput from '../ClassicInput/ClassicInput';
import FileInput from '../FileInput/FileInput';
import FloatButton from '../FloatButton/FloatButton';

type TСorrespondenceFormProps = {
    onSubmit?: (event: Event) => void;
    reset?: boolean;
}

class СorrespondenceForm extends Block {
    classicInput: ClassicInput;
    fileInput: FileInput;

    constructor(props: TСorrespondenceFormProps) {
      super({
        ClassicInput: new ClassicInput({
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение',
            value: ''
        }),
        SendButton: new FloatButton({
            formType: 'submit',
            id: 'sendMessage',
            icon: '/icons/arrow-left.svg',
        }),
        CancelButton: new FloatButton({
          formType: 'button',
          id: 'sendMessage',
          icon: '/icons/cancel.svg',
          onClick: (event: Event) => {
            this.handleCancelSelectFile(event);
          }
        }),
        FileInput: new FileInput({
            id: 'file',
            name: 'file',
            type: 'file',
            accept: 'image/*',
            isSelectedFile: false,
            onChange: (event: Event) => {
              this.handleChangeFile(event);
            }
          }),
          isSelectedFile: false,
        events: {
            submit: (event: Event) => {
                event.preventDefault();
                props.onSubmit && props.onSubmit(event);
            }
        },
        reset: false,
      });

      this.classicInput = this.children.ClassicInput;
      this.fileInput = this.children.FileInput;
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        if (oldProps.reset !== newProps.reset) {
            this.handleCancelSelectFile();
        }

        return true;
    }

    handleChangeFile(event: Event) {
        const fileName = (event.target as HTMLInputElement).files?.item(0)?.name;

        this.classicInput.setProps({
          value: fileName,
          isSelectedFile: true
        });
        this.setProps({
          isSelectedFile: true
        })
    }

    handleCancelSelectFile() {
        const form = document.forms.correspondenceForm;
        const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;

        this.classicInput.setProps({
          value: '',
          isSelectedFile: false
        });
        this.setProps({
          isSelectedFile: false,
          reset: false,
        })

        fileInput.value = '';
        form.reset();
    }


    render() {
      return `
            <form class="correspondence__footer" name="correspondenceForm">
                {{#if isSelectedFile}}
                  {{{ CancelButton }}}
                {{/if}}
                <label for="file" class="correspondence__attachFile {{#if isSelectedFile}}correspondence__attachFile_hidden{{/if}}"></label>
                {{{ FileInput }}}
                {{{ ClassicInput }}}
                <div class="correspondence__send">
                    {{{ SendButton }}}
                </div>
            </form>
      `
    }
}

export default СorrespondenceForm;