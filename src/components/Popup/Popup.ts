import Block, { Props } from '../../framework/Block';

type TPopupProps = {
  component: new (...props: Props[]) => Block,
  open?: boolean,
  login?: boolean,
  register?: boolean,
  changeAvatar?: boolean,
  createChat?: boolean,
  disableOverlay?: boolean,
};

class Popup extends Block {
  overlay: Element | null = null;

  popupChildren: Block;

  constructor(props: TPopupProps) {
    super({
      disableOverlay: props.disableOverlay,
      component: new props.component({
        onFinish: () => this.closePopup(),
        ...props,
      }),
      open: props.open, 
      events: {
        click: (e: Event) => {
          this.handleClosePopup(e);
        },
      },
    });

    this.popupChildren = this.children.component;
    this.popupChildren.props.onClosePopup = () => this.handleClosePopupWithoutOverlay();
  }
  
  handleClosePopup = (e: Event) => {
    if (e.target === e.currentTarget && !this.props.disableOverlay) {
      this.closePopup();
    }
  };

  handleClosePopupWithoutOverlay = () => {
    this.closePopup();
  };

  closePopup = () => {
    this.setProps({
      open: false,
    });

    this.clearFormsAndChildren();
  };

  

  clearFormsAndChildren() {
    const popupElement = document.querySelector('.Popup');
    if (popupElement) {
      const forms = popupElement.querySelectorAll('form');
      forms.forEach((form) => form.reset());
    }

    this.popupChildren.resetState();
    Object.values(this.popupChildren.children).forEach((child) => {
      child.resetState();
    });
  }
  
  render() {
    return `
            <div a
              class="Popup__overlay
                {{#if open}} Popup__overlay_isEnableOverlay {{/if}}
                {{#if disableOverlay}} Popup__overlay_hideOverlay {{/if}}"
              id="PopupOverlay"
              style="background-color: {{overlayColor}};"
            >
              <div class="Popup
                {{#if open}} Popup_open{{/if}}"
              >
                {{{component}}}
              </div>
            </div>      
      `;
  }
}

export default Popup;
