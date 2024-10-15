const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type TOptopns = {
  method?: string;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
  isFile?: boolean;
};
  

function queryStringify(data: TOptopns['data'] | FormData) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  if (data instanceof FormData) {
    return;  
  }
  
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
  
class HTTPTransport {
  API_URL: string = '';

  constructor({ API_URL }: { API_URL: string }) {
    this.API_URL = API_URL;
  }

  public get = (path: string, options?: TOptopns) => {
    return this._request(this.API_URL + path, { ...options, method: METHODS.GET }, options?.timeout);
  };
  
  public post = (path: string, options: TOptopns) => {
    return this._request(this.API_URL + path, { ...options, method: METHODS.POST }, options.timeout);
  };
    
  public put = (path: string, options: TOptopns) => {
    return this._request(this.API_URL + path, { ...options, method: METHODS.PUT }, options.timeout);
  };
    
  public delete = (path: string, options: TOptopns) => { 
    return this._request(this.API_URL + path, { ...options, method: METHODS.DELETE }, options.timeout);
  };
    
  private _request = (url: string, options: TOptopns, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, isFile } = options;
  
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

      if (!isFile) {
        headers['Content-Type'] = 'application/json';
      }
  
      xhr.withCredentials = true;
  
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });
  
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
  
      xhr.onabort = reject;
      xhr.onerror = reject;
  
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
  
      if (isGet || !data) {
        xhr.send();
      } else if (isFile) {
        xhr.send(data as FormData);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
