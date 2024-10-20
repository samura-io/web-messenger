import Block from '../../framework/Block';

type TInputProps = {
  label: string,
  type: string,
  name: string,
  value: string,
  id?: string,
  placeholder?: string,
  pattern?: string,
  required?: boolean,
  disabled?: boolean,
  minLength?: number,
  maxLength?: number,
  onlyStandartValidate?: boolean,
  onChange?: (e: InputEvent) => void
};

class Input extends Block {
  constructor(props: TInputProps) {
    super({
      id: props.id,
      ...props,
    });
  }

  componentDidMount(): void | (() => void) {

    if (this.props.id) {
      const InputRef = this.createRef(this.props.id as string);
      InputRef?.addEventListener('input', this.props.onChange as EventListener);
    }
    
    
    return () => {
      if (this.props.id) {
        const InputRef = this.createRef(this.props.id as string);
        InputRef?.removeEventListener('input', this.props.onChange as EventListener);
      }
    };
  }
  
  render() {
    return `
            <div class="Input">
                <label class="Input__label">{{label}}</label>
                <input 
                    class="Input__input" 
                    type="{{type}}" 
                    name="{{name}}" 
                    {{#if value}}value="{{value}}"{{/if}}
                    {{#if id}}id="{{id}}"{{/if}}
                    {{#if placeholder}}placeholder="{{placeholder}}"{{/if}}
                    {{#if pattern}}pattern="{{pattern}}"{{/if}} 
                    {{#if required}}required{{/if}}
                    {{#if disabled}}disabled{{/if}}
                    {{#if minLength}}minlength="{{minLength}}"{{/if}}
                    {{#if maxLength}}maxlength="{{maxLength}}"{{/if}}
                    {{#if onlyStandartValidate}}only-standart-validate="{{onlyStandartValidate}}"{{/if}}
                >
                    <span class="Input__error"></span>

            </div>    
      `;
  }
}

export default Input;
