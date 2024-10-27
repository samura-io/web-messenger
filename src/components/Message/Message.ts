import { TUser } from '../../controllers/ChatsController';
import Block from '../../framework/Block';
import Store from '../../framework/Store';
import { TMessage } from '../Correspondence/Correspondence';

type TMessageProps = {
  message: TMessage;
};

class Message extends Block {
  constructor(props: TMessageProps) {
    super({
      id: props.message.id,
      userId: props.message.user_id,
      chatId: props.message.chat_id,
      type: props.message.type,
      time: new Date(props.message.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      content: props.message.content,
      isRead: props.message.is_read,
      file: props.message.file || false,
      isMe: props.message.user_id === (Store.getState().user as TUser)?.id,
      ...props,
    });
  }
  
  render() {
    return `
        <div class="message">
            {{#if file}}
                <img src="{{file}}" class="message__image {{#if isMe}}message__image_me{{/if}}">
            {{else}}
                <span class="message__text {{#if isMe}}message__text_me{{/if}}">
                    <span class="message__login">{{login}}</span>
                    {{content}}
                    <span class="message__time">{{time}}</span>
                </span>
            {{/if}}
        </div>
      `;
  }
}

export default Message;
