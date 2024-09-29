import ForErrorPages from '../../components/ForErrorPages/ForErrorPages';
import Block from '../../framework/Block';


class InternalErorPage extends Block {
    constructor() {
      super({
        ForErrorPages: new ForErrorPages({
            code: '500',
            title: 'Мы уже фиксим',
        })
      });
    }
  
    render() {
        return `
            <main class="InternalErorPage">
                {{{ ForErrorPages }}}
            </main>
        `
    }
}

export default InternalErorPage;