import { TChat, TChatsList, TsearchableChat } from '../../pages/main/main';
import Block from '../../framework/Block';
import ChatItem from '../ChatItem/ChatItem';
import SearchableChatItem from '../SearchableChatItem/SearchableChatItem';

type TChatProps = {
  searchable: boolean,
  searchableChats: TsearchableChat[],
  chats: TChatsList,
  onSelectChat: (chatId: string) => void
};

class Chat extends Block {
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
      ChatList:
            props.chats?.map((chat: TChat)=>{
              return new ChatItem({
                id: chat.id,
                name: chat.name,
                text: chat.text,
                time: chat.time,
                me: chat.me,
                messageCount: chat.messageCount,
                avatar: chat.avatar,
                onSelectChat: props.onSelectChat,
              });
            }),
      ...props,
    });
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

export default Chat;
