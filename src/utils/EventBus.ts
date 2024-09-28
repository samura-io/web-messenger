type EventBusArgs = Array<unknown>
type EventBusCallback = (...args: unknown[]) => void;

class EventBus {
  listeners: { [key: string]: EventBusCallback[] };
  
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: EventBusCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventBusCallback) {
        if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

    emit(event: string, ...args: EventBusArgs) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
    
    this.listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
  }

export default EventBus