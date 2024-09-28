import Block from '../../utils/Block';

type TFloatButtonProps = {
    id: string
    icon: string
    formType?: string
}

class FloatButton extends Block {
    constructor(props: TFloatButtonProps) {
      super({
        ...props
      });
    }
  
    render() {
        return `
            <button 
                id="{{id}}" 
                type="{{#if formType}}{{formType}}{{else}}button{{/if}}" 
                class="FloatButton" style="background-image: url({{icon}})">
            </button>
        `
    }
}

export default FloatButton;