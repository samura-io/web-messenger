import Block from '../../framework/Block';

type TChatItemProps = {
  id: string,
  name: string,
  text: string,
  time: string,
  me: boolean,
  messageCount: number,
  avatar: string
  onSelectChat?: (chatId: string) => void
};

class ChatItem extends Block {
  constructor(props: TChatItemProps) {
    super({
      events: {
        click: () => {
          if (props.onSelectChat) {
            props.onSelectChat(props.id);
          }
        },
      },
      ...props,
    });
  }
  
  render() {
    return `
        <article class="ChtaItem">
            <div class="ChtaItem__avatar" style="background-image: url({{avatar}})"></div>
            <div class="ChtaItem__content">
                <span class="ChtaItem__name">{{name}}</span>
                    <span class="ChtaItem__text">
                        {{#if me}}
                        <span class="ChtaItem__me">Вы:</span>
                        {{/if}}
                        {{text}}
                    </span>
            </div>
            <div class="ChtaItem__indicators">
                <span class="ChtaItem__time">{{time}}</span>
                <div class="ChtaItem__indicator">{{messageCount}}</div>
            </div>
        </article>
      `;
  }
}

export default ChatItem;
