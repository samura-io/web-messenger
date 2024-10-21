import Chat, { Chat as ChatInterface } from '../../components/Chat/Chat';
import SearchableInput from '../../components/SearchableInput/SearchableInput';
import NavigationTo from '../../components/NavigationTo/NavigationTo';
import Correspondence from '../../components/Correspondence/Correspondence';
import Block from '../../framework/Block';
import { router } from '../../App';
import withoutAuth from '../../utils/withoutAuth';
import connect from '../../utils/connect';
import Button from '../../components/Button/Button';
import Popup from '../../components/Popup/Popup';
import CreateChat from '../../components/CreateChat/CreateChat';
import ChatsController, { defaultChat } from '../../controllers/ChatsController';

export type TMessage = {
  time: string;
  text?: string;
  image?: string;
  me?: boolean;
};

export type TChat = {
  id: string;
  name: string;
  avatar: string;
  text: string;
  me: boolean;
  messageCount: number;
  time: string;
  messageList: TMessage[];
};

export type TChatsList = TChat[];

export type TsearchableChat = {
  id: string;
  name: string;
  avatar: string;
};


class MainPage extends Block {
  chatComponent: ChatInterface;

  popup: Popup;

  correspondence: Correspondence;
    
  constructor() {
    super({
      NavigationTo: new NavigationTo({
        label: 'Профиль',
        url: '/profile',
        modifier: 'NavigationTo_position_right',
        id: 'toProfile',
        onClick: (e) => {
          e.preventDefault();
          router.go('/settings');
        },
      }),
      CancelSearch: new NavigationTo({
        label: '← Отмена',
        url: '/profile',
        modifier: 'NavigationTo_position_left',
        id: 'cancelSearch',
        accent: true,
        onClick: (e) => {
          this.handleCancelSearch(e);
        },
      }),
      SearchableInput: new SearchableInput({
        name: 'search',
        placeholder: 'Поиск',
        onFocus: () => {
          this.handleSearchEnable();
        },
      }),
      ChatComponent: new Chat({
        chats: [],
        searchable: false,
        searchableChats: [],
        onSelectChat: (chat: number, chatInfo: TChat) => {
          this.handleSelectChat(chat, chatInfo);
        },
      }),
      Correspondence: new Correspondence({
        chatId: 0,
        token: '',
        chatInfo: defaultChat,
        loading: true,
        messageList: [],
      }),
      CreateChatButton: new Button({
        label: 'Создать чат',
        type: 'primary',
        formType: 'button',
        onClick: () => {
          this.handleOpenPopup();
        },
      }),
      Popup: new Popup({
        open: false,
        component: CreateChat,
      }),
      searchable: false,
      isSelectChat: false,
    });

    this.chatComponent = this.children.Chat;
    this.popup = this.children.Popup as Popup;
    this.correspondence = this.children.Correspondence as Correspondence;
      
  }

  handleSearchEnable() {
    this.chatComponent.setProps({
      searchable: true,
    });
    this.setProps({
      searchable: true,
    });
  }

  handleOpenPopup() {
    this.popup.setProps({ open: true, isEnableOverlay: true  });
  }
  

  handleCancelSearch(e: Event) {
    e.preventDefault();
    this.chatComponent.setProps({
      searchable: false,
    });
    this.setProps({
      searchable: false,
    });
  }

  async handleSelectChat(chatId: number, chatInfo: TChat) {
    this.correspondence.setProps({
      loading: true,
    });
    try {
      const res = await ChatsController.getWebSocketsToken({ data: {} }, chatId);

      const newCorrespondenceProps = {
        chatId,
        token: res.token,
        chatInfo,
      };
      this.correspondence.setProps({
        ...newCorrespondenceProps,
      });
      this.setProps({
        isSelectChat: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    return `
            <main class="main">
                <div class="main__asideLeft">
                {{{ NavigationTo }}}
                <div class="main__topContainer">
                    {{{ CreateChatButton }}}
                  </div>
                    {{{ ChatComponent }}}
                </div>
                <div class="main__asideRight">
                    {{#if isSelectChat}}
                      {{{ Correspondence }}}
                    {{else}}
                      <span class="main__plug">Выберите чат чтобы отправить сообщение</span>
                    {{/if}}
                </div>
                {{{ Popup }}}
            </main>
        `;
  }
}

const withUser = connect(state => ({ user: state.user }));
const unprotectedComponent = withUser(MainPage);
export default withoutAuth(unprotectedComponent);
