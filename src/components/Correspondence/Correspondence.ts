import ChatsController, { TChat, TUser } from '../../controllers/ChatsController';
import Block, { Props } from '../../framework/Block';
import Store from '../../framework/Store';
import WebSocketTransport from '../../utils/WebSocketTransport';
import ChatUsers from '../ChatUsers/ChatUsers';
import FloatButton from '../FloatButton/FloatButton';
import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import Popup from '../Popup/Popup';
import CorrespondenceForm from '../CorrespondenceForm/CorrespondenceForm';

export type TMessage = {
  'id': number,
  'user_id': number,
  'chat_id': number,
  'type': string,
  'time': string,
  'content': string,
  'is_read': boolean,
  'file': string | null,
};

type TCorrespondenceProps = {
  chatId: number,
  token: string,
  chatInfo: TChat,
  messageList: Message[],
  loading?: boolean,
};

class Correspondence extends Block {
  correspondenceForm: CorrespondenceForm;

  webSocket: WebSocketTransport | null;

  constructor(props: TCorrespondenceProps) {
    super({
      CorrespondenceForm: new CorrespondenceForm({
        onSubmit: (event: Event) => {
          this.handleSubmit(event);
        },
      }),
      Popup: new Popup({
        component: ChatUsers,
        open: false,
      }),
      Loader: new Loader(),
      ShowMoreButton: new FloatButton({
        icon: '/icons/show-more.svg',
        formType: 'button',
        id: 'showMoreButton',
        transparent: true,
        onClick: () => {
          this.handleOpenPopup();
        },
      }),
      ...props,
    });
      
    this.correspondenceForm = this.children.CorrespondenceForm as CorrespondenceForm;
    this.webSocket = null;
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    if (oldProps.token !== newProps.token) {

      this.lists = {};
      this.webSocket?.close();

      this.setProps({
        chatId: newProps.chatId,
        avatar: `https://robohash.org/${newProps.chatId as number}`,
        messageList: [],
        MessageList: [],
        error: '',
      });

      this.webSocket = new WebSocketTransport(`wss://ya-praktikum.tech/ws/chats/${(Store.getState().user as TUser).id}/${this.props.chatId as number}/${this.props.token as string}`);
      this.webSocket.connect();
      this.webSocket.onOpen = () => {
        if (this.webSocket) {
          this.webSocket.sendInitialMessage();
          this.webSocket.playToPingPong();
        }
      };
      this.webSocket.onMessage = (e) => this.updateMessageList(e);
      this.webSocket.onError = () => this.showError();
    }

    return true;
  }

  showError() {
    this.setProps({
      error: 'Произошла ошибка, перезапустите приложение',
      loading: false,
    });
  }
  
  handleOpenPopup() {
    this.children.Popup.setProps({ open: true });
    const popup = this.children.Popup;
    const chatUsersForm = popup.children.component;
    chatUsersForm.setProps({
      chatId: this.props.chatId,
      loading: true,
    });
  }

  updateMessageList(e: MessageEvent) {
    const message = JSON.parse(e.data);

    if (message.type === 'pong') {
      return; 
    }

    if (message.type === 'user connected') {
      return; 
    }
    
    const newMessageList = (this.props.messageList as TMessage[])?.concat(message)
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    this.setProps({
      messageList: newMessageList,
      loading: false,
    });
      
    this.setProps({
      MessageList: 
      (this.props.messageList as TMessage[])?.map((element) => {
        return new Message({
          message: element,
        });
      }),
    });

    const lastMessage = document.querySelector('.message:first-child') ;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    ChatsController.getChats({});
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    console.dir(target);
    const formData = new FormData(target);

    const file = formData.get('file') as File;
    const message = formData.get('message') as string;

    if (file.size > 0) {
      console.log('Отправляем файл: ', file);
      this.correspondenceForm.setProps({
        reset: true,
      });
    } else if (message.trim()) {
      console.log('Отправляем сообщение: ', message.trim());
      this.webSocket?.send(JSON.stringify({
        content: message.trim(),
        type: 'message',
      }));
    }

    target.reset();
  }

  render() {
    return `
        {{#if isClose}}
          <span class="correspondence__close">Чат недоступен или закрыт</span>
        {{else}}
          <div class="correspondence">
            {{#if loading}}
                {{{Loader}}}
            {{else}}
              <div class="correspondence__header">
                  <div class="correspondence__userInfo">
                      <div class="correspondence__avatar" style="background-image: url({{avatar}})"></div>
                      <div class="correspondence__firstName">{{chatInfo.title}}</div>
                      <span class="correspondence__error">{{error}}</span>
                  </div>
                  {{{ ShowMoreButton }}}
              </div>
              <div class="correspondence__content" id="chatWindow">
                    {{{ MessageList }}}
              </div>
              {{{ CorrespondenceForm }}}
              {{{ Popup }}}
            {{/if}}
          </div>
        {{/if}}
        </div>
      `;
  }
}

export default Correspondence;
