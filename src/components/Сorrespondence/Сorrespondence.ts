import { TChat, TMessage } from '../../pages/main/main';
import Block from '../../framework/Block';
import Message from '../Message/Message';
import СorrespondenceForm from '../СorrespondenceForm/СorrespondenceForm';

type TCorrespondenceProps = {
  chatInfo: TChat;
};


class Сorrespondence extends Block {
  correspondenceForm: СorrespondenceForm;

  constructor(props: TCorrespondenceProps) {
    super({
      name: props.chatInfo.name,
      messageList: props.chatInfo.messageList,
      MessageList: 
            props.chatInfo.messageList?.map((message: TMessage) => {
              return new Message({
                text: message.text,
                time: message.time,
                image: message.image,
                me: message.me,
              });
            }),
      CorrespondenceForm: new СorrespondenceForm({
        onSubmit: (event: Event) => {
          this.handleSubmit(event);
        },
      }),
    });
      
    this.correspondenceForm = this.children.CorrespondenceForm as СorrespondenceForm;
  }

  componentDidUpdate(prevProps: TCorrespondenceProps, newProps: TCorrespondenceProps) {
    const chatInfo = this.props.chatInfo as TChat;
    const newMessageList = chatInfo.messageList;

    if (prevProps.chatInfo?.messageList !== newProps.chatInfo?.messageList) {
      this.setProps({
        name: newProps.chatInfo.name,
        MessageList: 
                newMessageList?.map((message: TMessage) => {
                  return new Message({
                    text: message.text,
                    time: message.time,
                    image: message.image,
                    me: message.me,
                  });
                }),
      });
    }
        
    return true;
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
    } else {
      console.log('Ничего не отправляем');
    }

    target.reset();
  }

  render() {
    return `
        <div class="correspondence">
            <div class="correspondence__header">
                <div class="correspondence__userInfo">
                    <div class="correspondence__avatar" style="background-image: url({{avatar}})"></div>
                    <div class="correspondence__firstName">{{name}}</div>
                </div>
                <div class="correspondence__showMore"></div>
            </div>
            <div class="correspondence__content">
                {{{ MessageList }}}
            </div>
            {{{ CorrespondenceForm }}}
        </div>
      `;
  }
}

export default Сorrespondence;
