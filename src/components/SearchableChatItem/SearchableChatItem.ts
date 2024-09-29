import Block from '../../framework/Block';

type TSearchableChatItemProps = {
    name: string;
    avatar: string;
    id: string;
    onSelectSearchableChat?: (chatId: string) => void;
}

class SearchableChatItem extends Block {
    constructor(props: TSearchableChatItemProps) {
      super({events: {
        click: () => props.onSelectSearchableChat && props.onSelectSearchableChat(props.id)
      } ,
        ...props
      });
    }
  
    render() {
      return `
        <article class="SearchableChatItem" chat-id={{id}}>
            <div class="SearchableChatItem__avatar" style="background-image: url({{avatar}})"></div>
            <span class="SearchableChatItem__name">{{name}}</span>
        </article>
      `
    }
}

export default SearchableChatItem;