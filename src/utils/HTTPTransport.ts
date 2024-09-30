const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type TOptopns = {
  method?: string;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  timeout?: number;
};
  

function queryStringify(data: TOptopns['data']) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
  
class HTTPTransport {

  static get = (url: string, options?: TOptopns) => {
    return this._request(url, { ...options, method: METHODS.GET }, options?.timeout);
  };
  
  static post = (url: string, options: TOptopns) => {
    return this._request(url, { ...options, method: METHODS.POST }, options.timeout);
  };
    
  static put = (url: string, options: TOptopns) => {
    return this._request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };
    
  static delete = (url: string, options: TOptopns) => { 
    return this._request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };
    
  private static _request = (url: string, options: TOptopns, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;
  
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject('No method');
        return;
      }
  
      const xhr = new XMLHttpRequest();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
      const isGet = method === METHODS.GET;
  
      xhr.open(
        method, 
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );
  
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
  
      xhr.onload = function () {
        resolve(xhr);
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
  
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
  
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;