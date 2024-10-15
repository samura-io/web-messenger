import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import Block, { Props } from '../../framework/Block';
import Router from '../../framework/Router';
import Store from '../../framework/Store';
import connect from '../../utils/connect';
import isEqual from '../../utils/isEqual';
import Validation from '../../utils/validation';
import Button from '../Button/Button';
import EditableAvatar from '../EditableAvatar/EditableAvatar';
import EditableEntry from '../EditableEntry/EditableEntry';
import Popup from '../Popup/Popup';

class ProfileForm extends Block {
  saveButton: Button;

  editableAvatar: EditableAvatar;

  form: HTMLFormElement | null;

  popup: Popup;

  constructor(props: Props) {
    
    super({
      EditableAvatar: new EditableAvatar({
        onClick: () => {
          this.handleIsChangeAvatar(true);
        },
      }),
      ChangePasswordForm: [
        new EditableEntry({
          label: 'Старый пароль',
          type: 'password',
          name: 'oldPassword',
          required: true,
          onlyStandartValidate: true,
        }),
        new EditableEntry({
          label: 'Новый пароль',
          type: 'password',
          name: 'password',
          required: true,
          minLength: 8,
          maxLength: 40,
        }),
        new EditableEntry({
          label: 'Повторите новый пароль',
          type: 'password',
          name: 'repeat-password',
          required: true,
          minLength: 8,
          maxLength: 40,
        }),
      ],
      ProfileForm: [
        new EditableEntry({
          label: 'Почта',
          type: 'text',
          name: 'email',
          value: 'example@ex.com1wd',
          required: true,
          disabled: true,
        }),
        new EditableEntry({
          label: 'Логин',
          type: 'text',
          name: 'login',
          value: 'ivanivanov',
          required: true,
          minLength: 3,
          maxLength: 20,
          disabled: true,
        }),
        new EditableEntry({
          label: 'Имя',
          type: 'text',
          name: 'first_name',
          value: 'Иван',
          required: true,
          minLength: 2,
          maxLength: 30,
          disabled: true,
        }),
        new EditableEntry({
          label: 'Фамилия',
          type: 'text',
          name: 'second_name',
          value: 'Иванов',
          required: true,
          minLength: 3,
          maxLength: 40,
          disabled: true,
        }),
        new EditableEntry({
          label: 'Телефон',
          type: 'text',
          name: 'phone',
          value: '+79099673030',
          required: true,
          maxLength: 15,
          minLength: 10,
          disabled: true,
        }),
      ],
      ChangeDataButtons: [
        new Button({
          label: 'Изменить данные',
          formType: 'button',
          id: 'editProfileData',
          type: 'link',
          events: {
            click: () => this.handleIsChangeData(false),
          },
        }),
        new Button({
          label: 'Изменить пароль',
          formType: 'button',
          id: 'savePasswordButton',
          type: 'link',
          events: {
            click: () => this.handleIsChangePassword(true),
          },
        }),
        new Button({
          label: 'Выйти',
          formType: 'button',
          id: 'logout',
          danger: true,
          type: 'link',
          onClick: () => {
            this.handleLogOut();
          },
        }),
      ],
      SaveButton: new Button({
        label: 'Сохранить',
        formType: 'submit',
        id: 'saveProfileData',
        type: 'primary',
      }),
      CancelChangeDataButton: new Button({
        label: 'Отменить',
        formType: 'button',
        type: 'link',
        events: {
          click: () => this.handleIsChangeData(true),
        },
      }),
      Popup: new Popup({
        changeAvatar: true,
        isEnableOverlay: true,
        onClose: (value: boolean) => this.handleClosePopup(value),
      }),
      CancelChangePasswordButton: new Button({
        label: 'Отменить',
        formType: 'button',
        type: 'link',
        onClick: () => this.handleIsChangePassword(false),
      }),
      isChangeAvatar: false,
      isChangePassword: false,
      isDisabled: true,
      user: {},
      ...props,
    });

    this.saveButton = this.children.SaveButton;
    this.editableAvatar  = this.children.EditableAvatar;
    this.popup = this.children.Popup as Popup;
    this.form = null;
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {

    if (!isEqual(oldProps?.user || {}, newProps.user || {})) {
      const oldInputsList = this.lists.ProfileForm;
      oldInputsList.forEach((input: EditableEntry) => {
        input.setProps({
          value: newProps.user?.[input.props.name as keyof typeof newProps.user],
        });
      });
      this.editableAvatar.setProps({
        avatar: (newProps.user as { avatar: string })?.avatar,
      });
    }

    if (oldProps.isDisabled !== newProps.isDisabled) {
      const oldInputsList = this.lists.ProfileForm;
      oldInputsList.forEach((input: EditableEntry) => {
        input.setProps({
          disabled: newProps.isDisabled,
        });
      });
    }
    return true;
  }

  componentDidMount(): void {
    this.initValidation();
  }

  initValidation() {
    const validation = new Validation('ProfileForm');
    this.form = validation.form;
    this.form?.addEventListener('validationSuccess', (e: Event)=>{
      this.handleValidSubmit(e as CustomEvent);
    });
  }

  async handleValidSubmit(event: CustomEvent) {

    this.saveButton.setProps({
      disabled: true,
      label: 'Загрузка...',
    });

    const fieldsData = event.detail.fields;
    
    try {
      if ('password' in fieldsData) {
        fieldsData.newPassword = fieldsData.password;
        await UserController.changePassword(fieldsData);
      } else {
        await UserController.changeProfile(fieldsData);
      }

      this.handleIsChangeData(true);
      this.handleIsChangePassword(false);

      this.resetForm();
    } catch (e) {
    
    }
    

    this.saveButton.setProps({
      disabled: false,
      label: 'Сохранить',
    });

    this.initValidation();
  }

  handleIsChangeData(value: boolean) {
    this.setProps({
      isDisabled: value,
      user: { ...this.props.user as { [key: string]: any }, errorMessage: '' },
    });
    this.initValidation();
    this.resetForm();
  }

  handleClosePopup(value: boolean) {
    this.setProps({
      isChangeAvatar: !value,
    });
  }

  handleIsChangePassword(value: boolean) {
    this.setProps({
      isChangePassword: value,
      user: { ...this.props.user as { [key: string]: any }, errorMessage: '' },
    });
    this.initValidation();
    this.resetForm();
  }

  handleIsChangeAvatar(value: boolean) {
    Store.set('user', { formDataError: '' });
    const popup = this.popup;
    const changeAvatar = popup.children.ChangeAvatar;
    changeAvatar.setProps({
      label: 'Выбрать файл',
      hasFile: false,
    });
    this.setProps({
      isChangeAvatar: value,
    });
  }

  resetForm() {
    if (this.form) {
      this.form.reset();
    }
  }

  async handleLogOut() {
    try {
      await AuthController.logout();
      const router = new Router('#app');
      router.go('/');
    } catch (error) {
      console.error(error);
    }
  }
  
  render() {
    
    return `
          <form class="ProfileForm" name="ProfileForm" novalidate>
              {{{ EditableAvatar }}}
              <span class="ProfileForm__name">{{user.first_name}}</span>
              {{#if isChangePassword}}
                  {{{ ChangePasswordForm }}}
                   <span class="ProfileForm__error">{{ user.errorMessage }}</span>
                      <div class="ProfileForm__footer">
                          {{{ SaveButton }}}
                          {{{ CancelChangePasswordButton }}}
                      </div>
              {{else}}
                          {{{ ProfileForm }}}
                          <span class="ProfileForm__error">{{ user.errorMessage }}</span>
                  <div class="ProfileForm__footer">
                      {{#if isDisabled}}
                          {{{ ChangeDataButtons }}}
                      {{else}}
                          {{{ SaveButton }}}
                          {{{ CancelChangeDataButton }}}
                      {{/if}}
                  </div>
              {{/if}}
              {{#if isChangeAvatar}}
                  {{{ Popup }}}
              {{/if}}
          </form>
        `;
  }
}

const withUser = connect(state => ({ user: state.user }));
export default withUser(ProfileForm);
