import Handlebars from 'handlebars/runtime';

// pages
import main from '../pages/main/main.hbs'
import loginPage from '../pages/login/loginPage.hbs'
import registerPage from '../pages/register/registerPage.hbs'
import profilePage from '../pages/profile/profilePage.hbs'

export const templates = {
    main,
    loginPage,
    registerPage,
    profilePage
};

// partials
import NavigationTo from '../components/NavigationTo/NavigationTo.hbs';
import SearchableInput from '../components/SearchableInput/SearchableInput.hbs';
import Chat from '../components/Chat/Chat.hbs';
import ChatItem from '../components/ChatItem/ChatItem.hbs';
import SearchableChatItem from '../components/SearchableChatItem/SearchableChatItem.hbs';
import Popup from '../components/Popup/Popup.hbs';
import LoginForm from '../components/LoginForm/LoginForm.hbs';
import Input from '../components/Input/Input.hbs';
import Button from '../components/Button/Button.hbs';
import RegisterForm from '../components/RegisterForm/RegisterForm.hbs';
import FloatButton from '../components/FloatButton/FloatButton.hbs';
import ProfileForm from '../components/ProfileForm/ProfileForm.hbs';
import EditableAvatar from '../components/EditableAvatar/EditableAvatar.hbs';
import EditableEntry from '../components/EditableEntry/EditableEntry.hbs';
import ChangeAvatar from '../components/ChangeAvatar/ChangeAvatar.hbs';

export function registerHandlebarsPartials() {
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
    Handlebars.registerPartial('FloatButton', FloatButton);
    Handlebars.registerPartial('ProfileForm', ProfileForm);
    Handlebars.registerPartial('EditableAvatar', EditableAvatar);
    Handlebars.registerPartial('EditableEntry', EditableEntry);
    Handlebars.registerPartial('ChangeAvatar', ChangeAvatar);
}

