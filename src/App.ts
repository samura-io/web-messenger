import Handlebars from 'handlebars/runtime';
import button from './components/button/button.hbs'
import main from './pages/main/main.hbs'
import notFound from './pages/not-found/not-found.hbs'

Handlebars.registerPartial('button', button);

export default class App {
    state: { [key: string]: any};
    appElement: HTMLElement | null
    constructor() {
        this.state = {
            currentPage: '/',
        }
        this.appElement = document.querySelector('#app')
    }

    render() {
        if (!this.appElement) {return}
        let template;
        if (this.state.currentPage === '/') {
            template = main({
                title: 'Главная страница',
                greetings: 'Никита'
            })
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/not-found') {
            template = notFound({});
            this.appElement.innerHTML = template;
        }
        this.setEventListeners();
    }

    setEventListeners() {
        const button = document.querySelector('#button');
        console.log(button);

        button?.addEventListener('click', () => {
            if (this.state.currentPage === '/') {
                this.changePage('/not-found');
            } else if (this.state.currentPage === '/not-found') {
                this.changePage('/');
            }
        })
    }

    changePage(path: string){
        this.state.currentPage = path;
        this.render();
    }
}