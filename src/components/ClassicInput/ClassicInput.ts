import Block from '../../utils/Block';

type TClassicInputProps = {
    name: string;
    value?: string;
    type: string;
    placeholder: string;
}

class ClassicInput extends Block {
    constructor(props: TClassicInputProps) {
      super({
        ...props
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
        >
      `
    }
}

export default ClassicInput;