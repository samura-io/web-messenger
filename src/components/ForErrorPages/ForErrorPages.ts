import Block from '../../framework/Block';
import Button from '../Button/Button';

type TForErrorPagesProps = {
  code: string;
  title: string;
};

class ForErrorPages extends Block {
  constructor(props: TForErrorPagesProps) {
    super({
      BackButton: new Button({
        label: 'Назад к чатам',
        type: 'link',
        formType: 'button',
        id: 'goToMain',
      }),
      ...props,
    });
  }
  
  render() {
    return `
            <div class="ForErrorPages">
                <span class="ForErrorPages__code">{{code}}</span>
                <span class="ForErrorPages__title">{{title}}</span>
                {{{ BackButton }}}
            </div>
        `;
  }
}

export default ForErrorPages;
