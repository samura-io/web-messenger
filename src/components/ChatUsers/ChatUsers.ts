import ChatsController, { TUser } from '../../controllers/ChatsController';
import Block, { Props } from '../../framework/Block';
import Store from '../../framework/Store';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';

type TCreateChatProps = {
  onFinish?: () => void;
};

class ChatUsers extends Block {
  submitButton: Button;

  titleInput: Input;

  constructor(props: TCreateChatProps) {
    super({
      SubmitButton: new Button({
        label: 'Добавить',
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
        label: 'ID пользователя',
        type: 'number',
        name: 'title',
        value: '',
        id: 'addUsers',
        onChange: (e: InputEvent) => {
          this.handleInputChange(e);
        },
      }),
      Loader: new Loader(),
      error: '',
      ...props,
    });

    this.submitButton = this.children.SubmitButton;
    this.titleInput = this.children.TitleInput;
  } 
  
  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.chatId !== newProps.chatId) {
      if (newProps.chatId) {
        this.updateChatList(newProps.chatId as number);
      }
    }

    return true;
  }

  async updateChatList(chatId: number) {
    try {
      const userList: TUser[] = await ChatsController.getUserList(chatId);
      this.setProps({
        UserList:  userList.map((user, index) => {
          return `
          <div class="ChatUsers__userContainer" id="user${index}">
            <span class="ChatUsers__userLogin">
            ${index + 1}. ${user.login}
            </span>
            <img 
              class="
              ChatUsers__remove
              ${user.id === (Store.getState().user as TUser).id ? 'ChatUsers__remove_hidden' : ''}
              " 
              data-id="${user.id}" 
              alt='remove user' src="/icons/remove.svg" 
            />
          </div>
          `;
        }),
        loading: false,
      });
      this.initRemoveEvents();
    } catch (error) {
      console.error(error);
    }
  }

  initRemoveEvents() {
    const removeButtons = document.querySelectorAll('.ChatUsers__remove');
    console.log(removeButtons);
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.handleDeleteUser(Number((button as HTMLElement).dataset.id));
      });
    });
  }

  handleDeleteUser = async (userId: number) => {
    const fields = { users: [userId], chatId: this.props.chatId };
    
    try {
      await ChatsController.removeUserFromChat({ data: fields });

      if (this.props.onFinish) {
        (this.props.onFinish as () => void)();
      }

      this.updateChatList(this.props.chatId as number);
    } catch (error) {
      this.setProps({
        error: 'Произошла ошибка, попробуйте позже',
      });
    }
  };
  
  async handleSubmit(e: Event) {
    e.preventDefault();

    this.setProps({
      error: '',
    });

    this.submitButton.setProps({
      disabled: true,
      label: 'Добавляем...',
    });

    const input = document.querySelector('#addUsers') as HTMLInputElement;
    const fields = { users: [input?.value], chatId: this.props.chatId };
    
    try {
      await ChatsController.addUserToChat({ data: fields });

      if (this.props.onFinish) {
        (this.props.onFinish as () => void)();
      }

      this.updateChatList(this.props.chatId as number);

    } catch (error) {
      this.setProps({
        error: 'Произошла ошибка, попробуйте позже',
      });
    }

    this.submitButton.setProps({
      disabled: false,
      label: 'Добавить',
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
        <form class="ChatUsers" id="ChatUsersForm">
            {{#if loading}}
            <div class="ChatUsers__loaderConteiner">
              {{{Loader}}}
            {{ else }}
              <span class="ChatUsers__title">Пользователи</span>
              <div class="ChatUsers__contentWrapper">
              {{{TitleInput}}}
              </div>
              <span class="ChatUsers__error">{{error}}</span>
              {{{SubmitButton}}}
              <div class="ChatUsers__usersList">
                  <span class="ChatUsers__usersListTitle">Список пользователей:</span>
                  {{{ UserList }}}
              </div>
            {{/if}}
        </form>   
      `;
  }
}

export default ChatUsers as typeof Block;
