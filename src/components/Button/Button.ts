import Block, { BlockEventsMap } from '../../framework/Block';

type TButtonProps = {
  label: string,
  type?: 'primary' | 'secondary' | 'link',
  formType?: 'submit' | 'button',
  id?: string,
  danger?: boolean,
  events?: BlockEventsMap,
  onClick?: (e: Event) => void,
  disabled?: boolean,
}

class Button extends Block {
    constructor(props: TButtonProps) {
      super({
        ...props,
      });
    }
  
    render() {
      return `
          <button 
              class="Button Button_type_{{type}}" 
              type="{{#if formType}}{{formType}}{{else}}button{{/if}}" 
              {{#if id}} id="{{id}}" {{/if}}
              {{#if danger}} danger="true" {{/if}}
              {{#if disabled}} disabled="true" {{/if}}
              >
                  {{label}}
          </button>
      `
    }
}

export default Button;