import Block from '../../framework/Block';

type TSearchableInputProps = {
    name?: string;
    value?: string;
    placeholder?: string;
    onFocus?: (e: Event) => void;
}

class SearchableInput extends Block {
    constructor(props: TSearchableInputProps) {
      super({
        ...props,
        events: {
          click: (e) => {
            props.onFocus && props.onFocus(e);
            const input = e.target as HTMLInputElement;
            input.focus();
          },
        },
      });
    }
  
    render() {
      return `
        <div class="SearchableInput">
        <img class="SearchableInput__icon" src="/icons/search.svg"/>
        <input class="SearchableInput__input" type="text" name="{{name}}" value="{{value}}" placeholder="{{placeholder}}"/>
        </div>
      `
    }
}

export default SearchableInput;