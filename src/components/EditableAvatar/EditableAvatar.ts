import Block from '../../utils/Block';

type TEditableAvatarProps = {

}

class EditableAvatar extends Block {
    constructor(props?: TEditableAvatarProps) {
      super({
        ...props,
      });
    }
  
    render() {
      return `
          <div class="EditableAvatar"></div>
      `
    }
}

export default EditableAvatar;