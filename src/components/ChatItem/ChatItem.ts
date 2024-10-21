import { TChat, TUser } from '../../controllers/ChatsController';
import Block, { Props } from '../../framework/Block';
import Store from '../../framework/Store';

type TChatItemProps = {
  chat: TChat,
  onSelectChat: (chatId: number) => void
};

const TimeOrDate = (date: string) => {
  let targetDate: Date;
  try {
    targetDate = new Date(date);
  } catch (error) {
    return '';
  }

  if (isNaN(targetDate.getTime())) {
    return '';
  }

  const nowDate = new Date();

  if (targetDate.getDay() === nowDate.getDay()) {
    return targetDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  } else {
    return targetDate.toLocaleDateString('ru-RU');
  }
};

class ChatItem extends Block {
  constructor(props: TChatItemProps) {
    super({
      events: {
        click: () => {
          if (props.onSelectChat) {
            props.onSelectChat(props.chat.id);
          }
        },
      },
      showUnread: props.chat.unread_count > 0,
      lastMessage: props.chat.last_message?.content || 'Пока нет сообщений',
      isMe: props.chat.last_message?.user.login === (Store.getState().user as TUser)?.login,
      avatarUrl: `https://robohash.org/${props.chat.id}`,
      time: TimeOrDate(props.chat.last_message?.time || ''),
      focus: false,
      ...props,
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if ((oldProps.chat as TChat).unread_count == (newProps.chat as TChat).unread_count) {

    }
    return false;
  }

  render() {
    return `
        <article class="
        ChtaItem
        {{#if focus}}
          ChtaItem__focused
        {{/if}}
        ">
            <div class="ChtaItem__avatar" style="background-image: url({{avatarUrl}})"></div>
            <div class="ChtaItem__content">
                <span class="ChtaItem__name">{{chat.title}}</span>
                    <span class="ChtaItem__text">
                        {{#if isMe}}
                        <span class="ChtaItem__me">Вы:</span>
                        {{/if}}
                        {{lastMessage}}
                    </span>
            </div>
            <div class="ChtaItem__indicators">
                <span class="ChtaItem__time">{{time}}</span>
                {{#if showUnread}}
                  <div class="ChtaItem__indicator">{{chat.unread_count}}</div>
                {{/if}}
            </div>
        </article>
      `;
  }
}

export default ChatItem;
