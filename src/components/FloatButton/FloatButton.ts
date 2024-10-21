import Block from '../../framework/Block';

type TFloatButtonProps = {
  id: string
  icon: string
  formType?: string
  transparent?: boolean
  onClick?: (e: Event) => void
};

class FloatButton extends Block {
  constructor(props: TFloatButtonProps) {
    super({
      events: {
        click: (e) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
      ...props,
    });
  }
  
  render() {
    return `
            <button 
                id="{{id}}" 
                type="{{#if formType}}{{formType}}{{else}}button{{/if}}" 
                class="FloatButton {{#if transparent}}FloatButton__transparent{{/if}}" 
                style="background-image: url({{icon}})">
            </button>
        `;
  }
}

export default FloatButton;
