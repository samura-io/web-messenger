import Block from '../../utils/Block';
import ClassicInput from '../ClassicInput/ClassicInput';
import FloatButton from '../FloatButton/FloatButton';
import Message from '../Message/Message';

type TCorrespondenceProps = {
    messageList: any;
}


class Сorrespondence extends Block {
    constructor(props: TCorrespondenceProps) {
      super({
        firstName: props.firstName,
        messageList: props.messageList,
        MessageList: 
            props.messageList.map((message: any) => {
                return new Message({
                    text: message.text,
                    time: message.time,
                    image: message.image,
                    me: message.me
                });
            }),
        ClassicInput: new ClassicInput({
            name: 'message',
            type: 'text',
            placeholder: 'Сообщение',
        }),
        SendButton: new FloatButton({
            formType: 'submit',
            id: 'sendMessage',
            icon: '/icons/arrow-left.svg',
        })
      });
    }

    componentDidUpdate(prevProps: TCorrespondenceProps, newProps: TCorrespondenceProps) {
        const newMessageList = this.props.messageList;

        if (prevProps.messageList !== newProps.messageList) {
                this.setProps({
                MessageList: 
                newMessageList.map((message: any) => {
                    return new Message({
                        text: message.text,
                        time: message.time,
                        image: message.image,
                        me: message.me
                    });
                }),
            })
        }
        
        

        
        return true;
      }

    render() {
      return `
        <div class="correspondence">
            <div class="correspondence__header">
                <div class="correspondence__userInfo">
                    <div class="correspondence__avatar" style="background-image: url({{avatar}})"></div>
                    <div class="correspondence__firstName">{{firstName}}</div>
                </div>
                <div class="correspondence__showMore"></div>
            </div>
            <div class="correspondence__content">
                {{{ MessageList }}}
            </div>
            <form class="correspondence__footer">
                <label for="file" class="correspondence__attachFile"></label>
                <input type="file" name="file" id="file" accept="image/*" style="display: none"></input>
                {{{ ClassicInput }}}
                <div class="correspondence__send">
                    {{{ SendButton }}}
                </div>
            </form>
        </div>
      `
    }
}

export default Сorrespondence;