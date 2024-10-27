import ChatApi from '../api/ChatApi';
import Store from '../framework/Store';
import { TOptopns } from '../utils/HTTPTransport';

export type TUser = {
  id: number,
  first_name: string,
  second_name: string,
  login: string,
  avatar: string,
  email: string,
  phone: string,
};

type TLastMessage = {
  user: TUser;
  time: string;
  content: string;
  id: number;
};

export type TChatTokenResponse = {
  token: string;
};

export type TChat = {
  id: number;
  title: string;
  avatar: string | null;
  created_by: number;
  unread_count: number;
  last_message: TLastMessage | null;
};

export type TChatsResponse = TChat[];

export const defaultChat: TChat = {
  id: 0,
  title: 'Создать чат',
  avatar: null,
  created_by: 0,
  unread_count: 0,
  last_message: null,
};

class ChatsController {

  static async getChats(request: TOptopns)  {
    try {
      const data  = await ChatApi.getChats(request);
      const chats: TChatsResponse = JSON.parse(data.response);
      const sortedChats = chats.sort((a, b) => {
        const dateA = new Date(a.last_message?.time ?? '');
        const dateB = new Date(b.last_message?.time ?? '');
        return dateB.getTime() - dateA.getTime();
      });
      Store.set('chats', sortedChats);
    } catch (error) {
      throw error;
    }
  }
  
  static async createChat(request: TOptopns) {
    try {
      await ChatApi.createChat(request);
    } catch (error) {
      throw error;
    }
  }

  static async getUserList(chatId: number) {
    try {
      const data = await ChatApi.getUserList(chatId);
      const userList: TUser[] = JSON.parse(data.response);
      return userList;
    } catch (error) {
      throw error;
    }
  }

  static async addUserToChat(request: TOptopns) {
    try {
      await ChatApi.addUserToChat(request);
    } catch (error) {
      throw error;
    }
  }

  static async removeUserFromChat(request: TOptopns) {
    try {
      await ChatApi.removeUserFromChat(request);
    } catch (error) {
      throw error;
    }
  }

  static async getWebSocketsToken(request: TOptopns, id: number) {
    try {
      const data = await ChatApi.getWebSocketsToken(request, id);
      const res: TChatTokenResponse = JSON.parse(data.response);
      return res;
    } catch (error) {
      throw error;
    }
  }

}

export default ChatsController;
