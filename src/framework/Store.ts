import set from '../utils/set';
import EventBus from './EventBus';

export enum StoreEvents {
  Updated = 'updated',
}

export type Indexed<T = unknown> = {
  [key: string]: T
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(key: string, value: unknown) {
    set(this.state, key, value);

    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
