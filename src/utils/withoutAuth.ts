import AuthController from '../controllers/AuthController';
import Block from '../framework/Block';
import { router } from '../App';
import store from '../framework/Store';
import Loader from '../components/Loader/Loader';

function withAuth(Component: typeof Block): new () => Block {
  return class extends Component {

    componentDidMount() {
      super.componentDidMount();

      if (store.getState().user) {
        return;
      }

      const checkUserData = async () => {
        try {
          // Вызов метода получения данных пользователя
          await AuthController.getUser();
          
          // Если данные успешно получены, сохраняем их в стор
          const userData = store.getState().user;
          
          if (userData) {
            this.setProps({ user: userData });
          }
  
        } catch (error: any) {
          if (error?.status === 401) {
            router.go('/');
          } else {
            router.go('/internal-error');
          }
        }
      };

      checkUserData();
    }

    render() {
      // Если пользователь не авторизован, рендер не происходит
      if (!store.getState().user) {
        const loader = new Loader();
        return loader.render();
      }

      // Рендерим защищённый компонент
      return super.render();
    }
  };
}

export default withAuth;
