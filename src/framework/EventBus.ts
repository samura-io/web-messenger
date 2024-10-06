type EventBusCallback<T = unknown> = (...args: T[]) => void; // Указан дженерик для колбэков

class EventBus {
  listeners: { [key: string]: EventBusCallback[] };

  constructor() {
    this.listeners = {};
  }

  on<T>(event: string, callback: EventBusCallback<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback as EventBusCallback);
  }

  off<T>(event: string, callback: EventBusCallback<T>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback,
    );
  }

  emit<T>(event: string, ...args: T[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}

export default EventBus;
