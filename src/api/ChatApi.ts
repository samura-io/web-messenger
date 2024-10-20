import { TOptopns } from '../utils/HTTPTransport';
import BaseApi from './BaseApi';

class ChatApi extends BaseApi {

  constructor() {
    super('https://ya-praktikum.tech/api/v2/chats/');
  }
    
  getChats(request: TOptopns) {
    return this.http.get('', request);
  }

  createChat(request: TOptopns) {
    return this.http.post('', request);
  }

  addUserToChat(request: TOptopns) {
    return this.http.put('users', request);
  }

  deleteUserFromChat(request: TOptopns) {
    return this.http.delete('users', request);
  }
  
  getUserList(chatId: number) {
    return this.http.get(`${chatId}/users`);
  }

  removeUserFromChat(request: TOptopns) {
    return this.http.delete('users', request);
  }

  getWebSocketsToken(request: TOptopns, id: number) {
    return this.http.post(`token/${id}`, request);
  }

}

export default new ChatApi;
