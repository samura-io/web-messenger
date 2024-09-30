export const chats = [
  {
    id: '1',
    name: 'Alice',
    avatar: 'alice.jpg',
    text: 'Круто!',
    me: true,
    messageCount: 2000,
    time: '09:15',
    messageList: [
      {
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
        time: '09:15',
      },
      {
        image: '/images/mock/SWC.jpg',
        time: '09:16',
      },
      {
        text: 'Круто!',
        time: '09:16',
        me: true,
      },
    ],
  },
  {
    id:'2',
    name: 'Bob',
    avatar: 'bob.jpg',
    text: 'До встречи завтра!',
    time: '09:15',
    messageCount: 0,
    me: true,
    messageList: [
      {
        text: 'Привет, как дела?',
        time: '09:15',
      },
      {
        text: 'Хуево',
        time: '09:16',
        me: true,
      },
    ],
  },
];

export const searchableChats = [
  {
    id: '1',
    name: 'Киномания',
    avatar: 'bob.jpg',
  },
];