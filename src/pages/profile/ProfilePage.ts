import { router } from '../../App';
import FloatButton from '../../components/FloatButton/FloatButton';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import Block from '../../framework/Block';
import withoutAuth from '../../utils/withoutAuth';

class ProfilePage extends Block {
  constructor() {
    super({
      FloatButton: new FloatButton({
        id: 'backToChats',
        icon: '/icons/arrow-left.svg',
        onClick: () => {
          router.go('/messenger');
        },
      }),
      ProfileForm: new ProfileForm({}),
    });
  }

  goBack = () => {
    router.go('/messenger');
  };

  componentDidMount() {
    super.componentDidMount();

    const leftAside = document.querySelector('.ProfilePage__asideLeft');

    leftAside?.addEventListener('click', this.goBack);

    return () => {
      leftAside?.removeEventListener('click', this.goBack);
    };
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

export default withoutAuth(ProfilePage);
