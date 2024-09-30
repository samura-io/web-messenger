import FloatButton from '../../components/FloatButton/FloatButton';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Block from '../../framework/Block';

class ProfilePage extends Block {
  constructor() {
    super({
      FloatButton: new FloatButton({
        id: 'backToChats',
        icon: '/icons/arrow-left.svg',
      }),
      ProfileForm: new ProfileForm({
        isChangeAvatar: false,
        isChangePassword: false,
        isDisabled: true,
      }),
    });
  }
  
  render() {
    return `
          <main class="ProfilePage">
              <div id="backToChats" class="ProfilePage__asideLeft">
                  {{{ FloatButton }}}
              </div>
              <div class="ProfilePage__asideRight">
                  {{{ ProfileForm }}}
              </div>
          </main>
        `;
  }
}

export default ProfilePage;