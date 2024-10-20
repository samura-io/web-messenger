import ChatsController from '../../controllers/ChatsController';
import Block from '../../framework/Block';
import Button from '../Button/Button';
import { fetchChats } from '../Chat/Chat';
import Input from '../Input/Input';

type TCreateChatProps = {
  onFinish?: () => void;
};

class CreateChat extends Block {
  submitButton: Button;

  titleInput: Input;

  constructor(props: TCreateChatProps) {
    super({
      SubmitButton: new Button({
        label: 'Создать',
        type: 'primary',
        formType: 'submit',
        id: 'submit',
        disabled: true,
      }),
      events: {
        submit: (e: Event) => {
          this.handleSubmit(e);
        },
      },
      TitleInput: new Input({
        label: 'Название',
        type: 'text',
        name: 'title',
        value: '',
        id: 'createChat',
        onChange: (e: InputEvent) => {
          this.handleInputChange(e);
        },
      }),
      error: '',
      ...props,
    });

    this.submitButton = this.children.SubmitButton;
    this.titleInput = this.children.TitleInput;
  } 
  
  async handleSubmit(e: Event) {
    e.preventDefault();

    this.setProps({
      error: '',
    });

    this.submitButton.setProps({
      disabled: true,
      label: 'Создание...',
    });

    const input = document.querySelector('.Input__input') as HTMLInputElement;
    const fields = { title: input?.value };
    
    try {
      await ChatsController.createChat({ data: fields });

      if (this.props.onFinish) {
        (this.props.onFinish as () => void)();
      }

      fetchChats();
    } catch (error) {
      this.setProps({
        error: 'Произошла ошибка, попробуйте позже',
      });
    }

    this.submitButton.setProps({
      disabled: false,
      label: 'Создать',
    });
  }

  handleInputChange(e: InputEvent) {
    const inputValue = (e.target as HTMLInputElement).value;
    if (inputValue.trim().length > 0) {
      this.submitButton.setProps({
        disabled: false,
      }); 
    } else {
      this.submitButton.setProps({
        disabled: true,
      }); 
    }
  }
  
  render() {
    return `
        <form class="CreateChat" id="createChatForm">
            <span class="CreateChat__title">Создать чат</span>
            <div class="CreateChat__contentWrapper">
            {{{TitleInput}}}
            </div>
            <span class="CreateChat__error">{{error}}</span>
            {{{SubmitButton}}}
        </form>   
      `;
  }
}

export default CreateChat as typeof Block;
