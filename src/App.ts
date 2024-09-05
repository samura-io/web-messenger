import Handlebars from 'handlebars/runtime';
import greetings from './templates/greetings.hbs'
import button from './partials/button.hbs'

Handlebars.registerPartial('button', button);

export default class App {
    state: { [key: string]: any};
    appElement: HTMLElement | null
    constructor() {
        this.state = {
            currentPage: '',
        }
        this.appElement = document.querySelector('#app')
    }

    render() {
        if (!this.appElement) {
            return;
        };

        const result = greetings({
            username: 'Nikita1',
        })
        
        this.appElement.innerHTML = result;
        
        setTimeout(() => {
            if (!this.appElement) {
                return;
            };
            
            this.appElement.innerHTML = greetings({
                username: 'ЗАебался'
            }) 
        }, 3000);


    }
}