import Block from '../../framework/Block';

type TEditableEntryProps = {
  label: string,
  type?: string,
  name?: string,
  value?: string,
  pattern?: string,
  disabled?: boolean,
  minLength?: number,
  maxLength?: number,
  required?: boolean,
  onlyStandartValidate?: boolean,
};

class EditableEntry extends Block {
  constructor(props: TEditableEntryProps) {
    super({
      ...props,
    });
  }
  
  render() {
    return `
      <div class="EditableEntry">
        <div class="EditableEntry__container">
            <label class="EditableEntry__label">{{label}}</label>
            <input 
              class="EditableEntry__input" 
              type="{{type}}" 
              name="{{name}}" 
              {{#if value}} value="{{value}}"{{/if}} 
              {{#if pattern}} pattern="{{pattern}}"{{/if}} 
              {{#if disabled}}disabled="true"{{/if}}
              {{#if minLength}}minlength="{{minLength}}"{{/if}}
              {{#if maxLength}}maxlength="{{maxLength}}"{{/if}}
              {{#if required}}required="{{required}}"{{/if}}
              {{#if onlyStandartValidate}}only-standart-validate"{{onlyStandartValidate}}"{{/if}}
            >
        </div>
        <div for="{{name}}" class="EditableEntry__error"></div>
      </div>
      `;
  }
}

export default EditableEntry;