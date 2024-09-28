import Block from '../../utils/Block';
import Validation from '../../utils/validation';
import Button from '../Button/Button';
import EditableAvatar from '../EditableAvatar/EditableAvatar';
import EditableEntry from '../EditableEntry/EditableEntry';
import Popup from '../Popup/Popup';

type TProfileFormProps = {
  isChangeAvatar: boolean;
  isChangePassword: boolean;
  isDisabled: boolean;
  onChangeData?: (isChage: boolean) => void;
}

class ProfileForm extends Block {
    constructor(props: TProfileFormProps) {
      super({
        EditableAvatar: new EditableAvatar({
          events: {
            click: () => this.handleIsChangeAvatar(true),
          }
        }),
        ChangePasswordForm: [
          new EditableEntry({
            label: "Старый пароль",
            type: "password",
            name: "password-old",
            required: true,
            onlyStandartValidate: true,
          }),
          new EditableEntry({
            label: "Новый пароль",
            type: "password",
            name: "password",
            required: true,
            minLength: 8,
            maxLength: 40,
          }),
          new EditableEntry({
            label: "Повторите новый пароль",
            type: "password",
            name: "repeat-password",
            required: true,
            minLength: 8,
            maxLength: 40,
          }),
        ],
        ProfileFields: [
          new EditableEntry({
            label: "Почта",
            value: "example@ex.com",
            disabled: true,
          }),
          new EditableEntry({
            label: "Логин",
            value: "ivanivanov",
            disabled: true,
          }),
          new EditableEntry({
            label: "Имя",
            value: "Иван",
            disabled: true,
          }),
          new EditableEntry({
            label: "Фамилия",
            value: "Иванов",
            disabled: true,
          }),
          new EditableEntry({
            label: "Имя в чате",
            value: "Иван",
            disabled: true,
          }),
          new EditableEntry({
            label: "Телефон",
            value: "+79099673030",
            disabled: true,
          }),
        ],
        ProfileForm: [
          new EditableEntry({
            label: "Почта",
            type: "text",
            name: "email",
            value: "example@ex.com",
            required: true,
          }),
          new EditableEntry({
            label: "Логин",
            type: "text",
            name: "login",
            value: "ivanivanov",
            required: true,
            minLength: 3,
            maxLength: 20,
          }),
          new EditableEntry({
            label: "Имя",
            type: "text",
            name: "first_name",
            value: "Иван",
            required: true,
            minLength: 2,
            maxLength: 30,
          }),
          new EditableEntry({
            label: "Фамилия",
            type: "text",
            name: "second_name",
            value: "Иванов",
            required: true,
            minLength: 3,
            maxLength: 40,
          }),
          new EditableEntry({
            label: "Имя в чате",
            type: "text",
            name: "display_name",
            value: "Иван",
            required: true,
          }),
          new EditableEntry({
            label: "Телефон",
            type: "text",
            name: "phone",
            value: "+79099673030",
            required: true,
            maxLength: 15,
            minLength: 10,
          }),
        ],
        ChangeDataButtons: [
          new Button({
            label: "Изменить данные",
            formType: "button",
            id: "editProfileData",
            type: "link",
            events: {
              click: () => this.handleIsChangeData(false),
            }
          }),
          new Button({
            label: "Изменить пароль",
            formType: "button",
            id: "savePasswordButton",
            type: "link",
            events: {
              click: () => this.handleIsChangePassword(true),
            }
          }),
          new Button({
            label: "Выйти",
            formType: "button",
            id: "logout",
            danger: true,
            type: "link",
          }),
        ],
        SaveButton: new Button({
          label: "Сохранить",
          formType: "submit",
          id: "saveProfileData",
          type: "primary",
        }),
        Popup: new Popup({
          changeAvatar: true,
          isEnableOverlay: true,
          submitChangeAvatar: (event, form) => this.handleSubmitChangeAvatar(event, form),
        }),
        ChangePasswordButton: new Button({
          label: "Сохранить",
          formType: "submit",
          id: "savePassword",
          type: "primary",
        }),
        isChangeAvatar: props.isChangeAvatar,
        isChangePassword: props.isChangePassword,
        isDisabled: props.isDisabled,
      });
    }

    componentDidMount(): void {

    }

    initValidation() {
      const validation = new Validation('ProfileForm');
      const form = validation.form;
      form?.addEventListener('validationSuccess', (e: Event)=>{
        this.handleValidSubmit(e as CustomEvent, form);
      });
    };

    handleValidSubmit(event: CustomEvent, form: HTMLFormElement) {
      const fieldsData = event.detail.fields;
      console.log(`Обновляем данные пользователя: ${JSON.stringify(fieldsData)}`);
      form.reset();
      this.setProps({
        isDisabled: true,
        isChangePassword: false,
      });
    }

    handleIsChangeData(value: boolean) {
      this.setProps({
        isDisabled: value,
      });
      this.initValidation();
    }

    handleIsChangePassword(value: boolean) {
      console.log(value);
      this.setProps({
        isChangePassword: value,
      });
      this.initValidation();
    }

    handleIsChangeAvatar(value: boolean) {
      this.setProps({
        isChangeAvatar: value,
      });
    }

    handleSubmitChangeAvatar(event: Event, form: HTMLFormElement) {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      console.log('Отправляем файл:', formData.get('file'));
      form.reset();
      this.setProps({
        isChangeAvatar: false,
      });
    }
  
    render() {
        return `
          <form class="ProfileForm" name="ProfileForm" novalidate>
              {{{ EditableAvatar }}}
              <span class="ProfileForm__name">{{name}}</span>
              {{#if isChangePassword}}
                  {{{ ChangePasswordForm }}}
                      <div class="ProfileForm__footer">
                          {{{ ChangePasswordButton }}}
                      </div>
              {{else}}
                  {{#if isDisabled}}
                          {{{ ProfileFields }}}
                      {{else}}
                          {{{ ProfileForm }}}
                      {{/if}}
                  <div class="ProfileForm__footer">
                      {{#if isDisabled}}
                          {{{ ChangeDataButtons }}}
                      {{else}}
                          {{{ SaveButton }}}
                      {{/if}}
                  </div>
              {{/if}}
              {{#if isChangeAvatar}}
                  {{{ Popup }}}
              {{/if}}
          </form>
        `
    }
}

export default ProfileForm;