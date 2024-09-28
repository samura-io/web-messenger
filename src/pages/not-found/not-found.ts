import ForErrorPages from '../../components/ForErrorPages/ForErrorPages';
import Block from '../../utils/Block';


class NotFoundPage extends Block {
    constructor() {
      super({
        ForErrorPages: new ForErrorPages({
            code: '404',
            title: 'Не туда попали',
        })
      });
    }
  
    render() {
        return `
            <main class="NotFoundPage">
                {{{ ForErrorPages }}}
            </main>
        `
    }
}

export default NotFoundPage;