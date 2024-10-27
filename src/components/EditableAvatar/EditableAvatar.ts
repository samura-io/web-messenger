import Block from '../../framework/Block';
import { BASE_URL } from '../../variables';

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
      <div class="EditableAvatar" style="background-image: url('${BASE_URL}/resources{{avatar}}');"></div>
    `;
  }
}

export default EditableAvatar;
