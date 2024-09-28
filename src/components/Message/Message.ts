import Block from '../../utils/Block';

type TMessageProps = {
    text?: string;
    time?: string;
    image?: string;
    me?: boolean;
}

class Message extends Block {
    constructor(props: TMessageProps) {
      super({
        ...props
      });
    }
  
    render() {
      return `
        <div class="message">
            {{#if image}}
                <img src="{{image}}" class="message__image {{#if me}}message__image_me{{/if}}">
            {{else}}
                <span class="message__text {{#if me}}message__text_me{{/if}}">
                    {{text}}
                    <span class="message__time">{{time}}</span>
                </span>

            {{/if}}
        </div>
      `
    }
}

export default Message;