import Block from '../../utils/Block';

type TNavigationToProps = {
    label: string,
    url: string,
    modifier?: string,
    id?: string,
    onClick?: (e: Event) => void,
    accent?: boolean
}

class NavigationTo extends Block {
    constructor(props: TNavigationToProps) {
      super({
        ...props,
        events: {
          click: (e) => {
            props.onClick && props.onClick(e);
          }
        }
      });
    }
  
    render() {
      return `
        <a 
            href="{{url}}" 
            class="NavigationTo {{modifier}}" 
            id="{{id}}"
            {{#if accent}}style="color: var(--accent)"{{/if}}
        >
            {{label}} 
        </a>
      `
    }
}

export default NavigationTo;