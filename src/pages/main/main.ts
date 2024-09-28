import Chat from '../../components/Chat/Chat';
import SearchableInput from '../../components/SearchableInput/SearchableInput';
import NavigationTo from '../../components/NavigationTo/NavigationTo';
import Сorrespondence from '../../components/Сorrespondence/Сorrespondence';
import { chats, searchableChats } from '../../data/chats';
import Block from '../../utils/Block';


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
          }
        }),
        CancelSearch: new NavigationTo({
          label: '← Отмена',
          url: '/profile',
          modifier: 'NavigationTo_position_left',
          id: 'cancelSearch',
          accent: true,
          onClick: (e) => {
            this.handleCancelSearch(e);
          }
        }),
        SearchableInput: new SearchableInput({
          name: 'search',
          placeholder: 'Поиск',
          onFocus: () => {
            this.handleSearchEnable();
          }
        }),
        Chat: new Chat({
            chats: chats,
            searchable: false,
            searchableChats: searchableChats,
            onSelectChat: (chat: any) => {
                this.handleSelectChat(chat);
            }
        }),
        Сorrespondence: new Сorrespondence({
          messageList: [],
        }),
        searchable: false,
        isSelectChat: false,
      });

      this.chatComponent = this.children.Chat;
      this.correspondence = this.children.Сorrespondence;
      
    }

    handleSearchEnable() {
      this.chatComponent.setProps({
          searchable: true,
      });
      this.setProps({
        searchable: true,
      })
    }

    handleCancelSearch(e: Event) {
      e.preventDefault();
      this.chatComponent.setProps({
        searchable: false,
      });
      this.setProps({
        searchable: false,
      })
    }

    handleSelectChat(chatId: any) {
      const currentChat = chats.find((item: any) => item.id === chatId);
      this.correspondence.setProps({
        messageList: currentChat?.messageList,
        firstName: currentChat?.name,
      })
      this.setProps({
        isSelectChat: true,
      })
    }

  
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
        `
    }
}

export default MainPage;