import { registerHandlebarsPartials, templates } from './helpers/handlebarsInputs';
import InternalErorPage from './pages/internal-error/internal-error';
import LoginPage from './pages/login/LoginPage';
import MainPage from './pages/main/main';
import NotFoundPage from './pages/not-found/not-found';
import ProfilePage from './pages/profile/ProfilePage';
import RegisterPage from './pages/register/RegisterPage';

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
            const mainPage = new MainPage();
            template = mainPage.getContent();
            this.appElement.appendChild(template);
            mainPage.dispatchComponentDidMount();
        } else if (this.state.currentPage === '/login') {
            const loginPage = new LoginPage();
            template = loginPage.getContent();
            this.appElement.appendChild(template);
            loginPage.dispatchComponentDidMount();
        } else if (this.state.currentPage === '/register') {
            const registerPage = new RegisterPage();
            template = registerPage.getContent();
            this.appElement.append(template);
            registerPage.dispatchComponentDidMount();
        } else if (this.state.currentPage === '/profile') {
            const profilePage = new ProfilePage();
            template = profilePage.getContent();
            this.appElement.appendChild(template);
            profilePage.dispatchComponentDidMount();
        } else if (this.state.currentPage === '/not-found') {
            const notFoundPage = new NotFoundPage();
            template = notFoundPage.getContent();
            this.appElement.appendChild(template);
        } else if (this.state.currentPage === '/internal-error') {
            const internalErorPage = new InternalErorPage();
            template = internalErorPage.getContent();
            this.appElement.appendChild(template);
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

        // goToMain?.addEventListener('click', () => {
        //     this.changePage('/');
        // });

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
        if (this.appElement) {
            this.state.currentPage = path;
            this.appElement.innerHTML = '';
            this.render();
        }
    }
}
