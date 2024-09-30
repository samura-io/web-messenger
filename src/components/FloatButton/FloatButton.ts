import Block from '../../framework/Block';

type TFloatButtonProps = {
  id: string
  icon: string
  formType?: string
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
                class="FloatButton" style="background-image: url({{icon}})">
            </button>
        `;
  }
}

export default FloatButton;
