const enum Events {
  OPEN = 'open',
  CLOSE = 'close',
  MESSAGE = 'message',
  ERROR = 'error',
}

class WebSocketTransport {
  private webSocket: WebSocket | null;

  private url: string;

  isPingPong: null | NodeJS.Timeout;

  constructor(url: string) {
    this.url = url;
    this.webSocket = null;
    this.isPingPong = null;
  }

  public connect() {
    this.webSocket = new WebSocket(this.url);
    this._dispatchEvents(this.webSocket);
  }

  private _dispatchEvents(socket: WebSocket) {
    socket.addEventListener('open', (e) => this.onOpen(e));
    socket.addEventListener('message', (e) => this.onMessage(e));
    socket.addEventListener('error', (e) => this.onError(e));
    socket.addEventListener('close', (e) => this.onClose(e));
  }

  public onOpen(e: WebSocketEventMap[Events.OPEN]) {
    console.log('Message received:', e);
  }

  public onMessage(e: WebSocketEventMap[Events.MESSAGE]) {
    console.log('Message received:', e.data);
  }

  public onError(e: WebSocketEventMap[Events.ERROR]) {
    console.error('WebSocket error:', e);
  }

  public onClose(e: WebSocketEventMap[Events.CLOSE]) {
    this.isPingPong = null;
    console.log('Connection closed:', e);
  }

  public sendInitialMessage() {
    if (this.webSocket) {
      this.webSocket.send(JSON.stringify({
        content: '0',
        type: 'get old',
      }));
    }
  }

  public playToPingPong() {
    this.isPingPong = setInterval(() => {
      if (this.webSocket) {
        this.webSocket.send(JSON.stringify({
          type: 'ping',
        }));
      }
    }, 30000);

  }

  public send(data: string) {
    if (this.webSocket && this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(data);
    } else {
      console.warn('WebSocket is not open. Message not sent:', data);
    }
  }

  public close() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }
}

export default WebSocketTransport;
