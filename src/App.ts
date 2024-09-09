import { chats, searchableChats } from './data/chats';
import { registerHandlebarsPartials, templates } from './helpers/handlebarsInputs';

registerHandlebarsPartials();


export default class App {
    state: { [key: string]: any};
    appElement: HTMLElement | null;
    constructor() {
        this.state = {
            currentPage: '/login',
            searchable: false,
        }
        this.appElement = document.querySelector('#app')
    }

    render() {
        if (!this.appElement) {return}
        let template;
        if (this.state.currentPage === '/') {
            template = templates.main({ 
                searchable: this.state.searchable,
                chats,
                searchableChats,
            });
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/login') {
            template = templates.loginPage({});
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/register') {
            template = templates.registerPage({});
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/profile') {
            template = templates.profilePage({});
            this.appElement.innerHTML = template;
        }
        this.setEventListeners();
    }

    setEventListeners() {
        const noAccount = document.querySelector('#noAccount');
        const goToLogin = document.querySelector('#goToLogin');


        noAccount?.addEventListener('click', () => {
            this.changePage('/register');
        });

        goToLogin?.addEventListener('click', () => {
            this.changePage('/login');
        });

    }

    changePage(path: string){
        this.state.currentPage = path;
        this.render();
    }
}