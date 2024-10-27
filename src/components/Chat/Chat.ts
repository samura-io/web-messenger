import { TChatsList, TsearchableChat } from '../../pages/main/main';
import Block, { Props } from '../../framework/Block';
import ChatItem from '../ChatItem/ChatItem';
import SearchableChatItem from '../SearchableChatItem/SearchableChatItem';
import ChatsController, { TChat, TChatsResponse } from '../../controllers/ChatsController';
import connect from '../../utils/connect';
import isEqual from '../../utils/isEqual';

type TChatProps = {
  searchable: boolean,
  searchableChats: TsearchableChat[],
  chats: TChatsList,
  onSelectChat: (chatId: number, chatInfo: TChat) => void
};

export function fetchChats() {
  const getChats = async () => {
    try {
      await ChatsController.getChats({});
    } catch (error) {
      console.error(error);
    }
  };
  
  getChats();
}

export class Chat extends Block {


  constructor(props: TChatProps) {
    super({
      SearchableChatList: 
            props.searchableChats?.map((chat: TsearchableChat)=>{
              return new SearchableChatItem({
                id: chat.id,
                name: chat.name,
                avatar: chat.avatar,
              });
            }),
      createChat: false,
      ...props,
    });

  }

  componentDidMount(): void | (() => void) {
    fetchChats();
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (!isEqual(oldProps?.chats || {}, newProps?.chats || {})) {
      this.setProps({ 
        ChatList:
        (newProps.chats as TChatsResponse).map((chat)=>{
          const onSelectChatHandler = (chatId: number) => {
            (this.props.onSelectChat as (chatId: number, chatInfo: TChat) => void)(chatId, chat);
            this.setProps({ selectedChat: chatId });
          };
          return new ChatItem({
            chat: chat,
            onSelectChat: onSelectChatHandler,
          });
        }),
      });
    }

    if (oldProps.selectedChat !== newProps.selectedChat) {
      const chatList = this.lists.ChatList;
      chatList.forEach((chat) => chat.setProps({ focus: false }));
      const targetChat = chatList.find((chat) => (chat.props.chat as TChat).id === newProps.selectedChat);

      if (targetChat) {
        targetChat.setProps({ focus: true });
      } else {
        chatList[0].setProps({ focus: true });
      }
    }
    return true;
  }
  
  
  render() {
    return `
        <div class="Chat">
            {{#if searchable}}
                {{{ SearchableChatList }}}
            {{else}}
                {{{ ChatList }}}
            {{/if}}
        </div>
      `;
  }
}

const withChats = connect(state => ({ chats: state.chats }));
export default withChats(Chat);
