import Block, { Props } from '../framework/Block';
import store, { Indexed, StoreEvents } from '../framework/Store';
import isEqual from './isEqual';

function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: Props) {
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });
    
        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(this.props, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    };
  };

}

type UserSlice = {
  name: string;
  avatar: string;
};

export function mapUserToProps(state: Indexed<UserSlice>) {
  return {
    name: state.user.name,
    avatar: state.user.avatar,
  };
}


export default connect;
