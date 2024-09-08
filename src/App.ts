import Handlebars from 'handlebars/runtime';
import main from './pages/main/main.hbs'
import notFound from './pages/not-found/not-found.hbs'


import NavigationTo from './components/NavigationTo/NavigationTo.hbs';
import SearchableInput from './components/SearchableInput/SearchableInput.hbs';
import Chat from './components/Chat/Chat.hbs';
import ChatItem from './components/ChatItem/ChatItem.hbs';

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
    ]
}


Handlebars.registerPartial('NavigationTo', NavigationTo);
Handlebars.registerPartial('SearchableInput', SearchableInput);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('ChatItem', ChatItem);

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
            template = main(data);
            this.appElement.innerHTML = template;
        } else if (this.state.currentPage === '/not-found') {
            template = notFound({});
            this.appElement.innerHTML = template;
        }
        this.setEventListeners();
    }

    setEventListeners() {
        const button = document.querySelector('#button');

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