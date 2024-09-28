import Block from '../../utils/Block';

type TInputProps = {
    label: string,
    type: string,
    name: string,
    value: string,
    placeholder?: string,
    pattern?: string,
    required?: boolean,
    disabled?: boolean,
    minLength?: number,
    maxLength?: number,
    onlyStandartValidate?: boolean
}

class Input extends Block {
    constructor(props: TInputProps) {
      super({
        ...props,
      });
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
      `
    }
}

export default Input;