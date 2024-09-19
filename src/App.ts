import { chats, searchableChats, messages } from './data/chats';
import { registerHandlebarsPartials, templates } from './helpers/handlebarsInputs';

registerHandlebarsPartials();

export default class App {
    state: { [key: string]: any};
    appElement: HTMLElement | null;
    constructor() {
        this.state = {
            currentPage: '/',
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
                messages,
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
        } else if (this.state.currentPage === '/not-found') {
            template = templates.notFoundPage({});
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/internal-error') {
            template = templates.internalErorPage({});
            this.appElement.innerHTML = template;
        }
        

        this.setEventListeners();
    }

    setEventListeners() {
        const noAccount = document.querySelector('#noAccount');
        const goToLogin = document.querySelector('#goToLogin');
        const goToProfile = document.querySelector('#toProfile');
        const goToMain = document.querySelector('#goToMain');
        const logout = document.querySelector('#logout');
        const backToChats = document.querySelector('#backToChats');

        backToChats?.addEventListener('click', () => {
            this.changePage('/');
        });

        logout?.addEventListener('click', () => {
            this.changePage('/login');
        });

        goToMain?.addEventListener('click', () => {
            this.changePage('/');
        });

        goToProfile?.addEventListener('click', (e) => {
            e.preventDefault();
            this.changePage('/profile');
        });

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
