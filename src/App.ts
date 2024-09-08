import Handlebars from 'handlebars/runtime';

// pages
import main from './pages/main/main.hbs'
import loginPage from './pages/login/loginPage.hbs'
import registerPage from './pages/register/registerPage.hbs'

// partials
import NavigationTo from './components/NavigationTo/NavigationTo.hbs';
import SearchableInput from './components/SearchableInput/SearchableInput.hbs';
import Chat from './components/Chat/Chat.hbs';
import ChatItem from './components/ChatItem/ChatItem.hbs';
import SearchableChatItem from './components/SearchableChatItem/SearchableChatItem.hbs';
import Popup from './components/Popup/Popup.hbs';
import LoginForm from './components/LoginForm/LoginForm.hbs';
import Input from './components/Input/Input.hbs';
import Button from './components/Button/Button.hbs';
import RegisterForm from './components/RegisterForm/RegisterForm.hbs';

Handlebars.registerPartial('NavigationTo', NavigationTo);
Handlebars.registerPartial('SearchableInput', SearchableInput);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('ChatItem', ChatItem);
Handlebars.registerPartial('SearchableChatItem', SearchableChatItem);
Handlebars.registerPartial('Popup', Popup);
Handlebars.registerPartial('LoginForm', LoginForm);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('RegisterForm', RegisterForm);


const data = {
    chats: [
      {
        name: "Alice",
        avatar: "alice.jpg",
        text: "Привет! Как дела? Привет! Как дела? Привет! Как дела? Привет! Как дела? Привет! Как дела? Привет!",
        messageCount: 2000,
      },
      {
        name: "Bob",
        avatar: "bob.jpg",
        text: "До встречи завтра!",
        time: "09:15",
        messageCount: 0,
        me: true,
      },
    ],
    searchableChats: [
        {
            name: "Bob",
            avatar: "bob.jpg",
        },
    ],
}

export default class App {
    state: { [key: string]: any};
    appElement: HTMLElement | null
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
            template = main({ 
                searchable: this.state.searchable,
                ...data,
            });
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/login') {
            template = loginPage({});
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/register') {
            template = registerPage({});
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