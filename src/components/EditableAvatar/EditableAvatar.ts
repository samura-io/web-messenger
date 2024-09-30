import Block from '../../framework/Block';

type TEditableAvatarProps = {
  avatar?: string;
  onClick?: () => void;
};

class EditableAvatar extends Block {
  constructor(props?: TEditableAvatarProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (props?.onClick) {
            props?.onClick();
          }
        },
      },
    });
  }
  
  render() {
    return `
          <div class="EditableAvatar"></div>
      `;
  }
}

export default EditableAvatar;