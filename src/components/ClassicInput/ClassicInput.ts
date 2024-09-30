import Block from '../../framework/Block';

type TClassicInputProps = {
  name: string;
  dafvalue?: string;
  type: string;
  placeholder: string;
  isSelectedFile?: boolean;
  value?: string;
};

class ClassicInput extends Block {
  constructor(props: TClassicInputProps) {
    super({
      ...props,
    });
  }
  
  render() {
    return `
        <input 
            placeholder="{{placeholder}}" 
            name="{{name}}" 
            value="{{value}}" 
            type="{{type}}" 
            class="classicInput"
            {{#if isSelectedFile}}disabled{{/if}}
        >
      `;
  }
}

export default ClassicInput;