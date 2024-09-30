import Chat from '../../components/Chat/Chat';
import SearchableInput from '../../components/SearchableInput/SearchableInput';
import NavigationTo from '../../components/NavigationTo/NavigationTo';
import Сorrespondence from '../../components/Сorrespondence/Сorrespondence';
import { chats, searchableChats } from '../../data/chats';
import Block from '../../framework/Block';
// import HTTPTransport from '../../utils/HTTPTransport';

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
  chatComponent: Chat;

  correspondence: Сorrespondence;
    
  constructor() {
    super({
      NavigationTo: new NavigationTo({
        label: 'Профиль',
        url: '/profile',
        modifier: 'NavigationTo_position_right',
        id: 'toProfile',
        onClick: (e) => {
          this.handleCancelSearch(e);
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
      Chat: new Chat({
        chats: chats,
        searchable: false,
        searchableChats: searchableChats,
        onSelectChat: (chat: string) => {
          this.handleSelectChat(chat);
        },
      }),
      Сorrespondence: new Сorrespondence({
        chatInfo: chats[0],
      }),
      searchable: false,
      isSelectChat: false,
    });

    this.chatComponent = this.children.Chat;
    this.correspondence = this.children.Сorrespondence as Сorrespondence;
      
  }

  handleSearchEnable() {
    this.chatComponent.setProps({
      searchable: true,
    });
    this.setProps({
      searchable: true,
    });
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

  handleSelectChat(chatId: string) {
    const currentChat = chats.find((item) => item.id === chatId);
    this.correspondence.setProps({
      chatInfo: currentChat,
    });
    this.setProps({
      isSelectChat: true,
    });
  }

  // тетстируем HTTPTransport

  // async componentDidMount(): Promise<void> {
  //   const KenyeWestQuotes = await HTTPTransport.get('https://api.kanye.rest');
  //   if (KenyeWestQuotes.status === 200) {
  //     console.log(KenyeWestQuotes.response);
  //   }

  //   const createdSomeUser = await HTTPTransport.post('https://reqres.in/api/users', {
  //     data: {
  //       name: 'John',
  //       job: 'leader',
  //     },
  //   })
  //   if (createdSomeUser.status === 201) {
  //     console.log(createdSomeUser.response);
  //   }
  // }

  
  render() {
    return `
            <main class="main">
                <div class="main__asideLeft">
                    {{#if searchable}}
                      {{{CancelSearch}}}
                    {{else}}
                      {{{ NavigationTo }}}
                    {{/if}}
                    {{{ SearchableInput }}}
                    {{{ Chat }}}
                </div>
                <div class="main__asideRight">
                    {{#if isSelectChat}}
                      {{{ Сorrespondence }}}
                    {{else}}
                      <span class="main__plug">Выберите чат чтобы отправить сообщение</span>
                    {{/if}}
                </div>
            </main>
        `;
  }
}

export default MainPage;