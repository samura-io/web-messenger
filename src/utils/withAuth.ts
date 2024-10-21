import AuthController from '../controllers/AuthController';
import Block from '../framework/Block';
import { router } from '../App';
import store from '../framework/Store';

function withoutAuth(Component: typeof Block): new () => Block {
  return class extends Component {

    componentDidMount() {
      super.componentDidMount();

      if (store.getState().user) {
        return;
      }

      const checkUserData = async () => {
        try {
          const userData = await AuthController.getUser({ store: 'off' });
          
          if (userData) {
            this.setProps({ user: userData });
            router.go('/messenger');
          }
  
        } catch (error: any) {
          if (error?.status === 401) {
            return;
          } else {
            console.log(error);
            router.go('/internal-error');
          }
        }
      };

      checkUserData();
    }

    render() {
      // Рендерим защищённый компонент
      return super.render();
    }
  };
}

export default withoutAuth;
