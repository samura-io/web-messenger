import Block from '../../framework/Block';

type TEditableAvatarProps = {
  avatar?: string;
};

class EditableAvatar extends Block {
  constructor(props?: TEditableAvatarProps) {
    super({
      ...props,
    });
  }
  
  render() {
    return `
          <div class="EditableAvatar"></div>
      `;
  }
}

export default EditableAvatar;