import Block from '../../utils/Block';

type TFileInputProps = {
    type: string,
    name: string,
    id: string,
    accept: string,
    isSelectedFile?: boolean
    onChange?: (event: Event) => void
}

class FileInput extends Block {
    value: unknown;
    constructor(props: TFileInputProps) {
      super({
        ...props,
        events: {
          change: (event: Event) => {
            props.onChange && props.onChange(event);
          },
        }
      });
    }
      
  
    render() {
      return `
        <input 
            class="ChangeAvatar__input" 
            type='{{type}}' 
            name="{{name}}" 
            id="{{id}}" 
            accept="{{accept}}"
        >  
      `
    }
}

export default FileInput;