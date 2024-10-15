import HTTPTransport from '../utils/HTTPTransport';

export interface ApiError {
  status: number;
  message?: string; // You can add other properties if needed
}

class BaseApi {
  protected http: HTTPTransport;

  protected constructor(url: string) {
    this.http = new HTTPTransport({ API_URL: url });        
  }

}

export default BaseApi;
