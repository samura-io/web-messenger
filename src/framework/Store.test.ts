import { expect } from 'chai';
import Store, { StoreEvents } from './Store.ts';

describe('Store', () => {
  beforeEach(() => {
    Store.on(StoreEvents.Updated, () => { });
  });

  afterEach(() => {
    Store.reset();
  });

  it('Начальное состояние пустое', () => {
    expect(Store.getState()).to.deep.equal({});
  });

  it('Возвращает текущее сосотояние', () => {
    Store.set('key', 'value');
    expect(Store.getState().key).to.deep.equal('value');
  });

  it('Обновляет состояние', () => {
    Store.set('key', 'value');
    Store.set('key', 'value2');

    expect(Store.getState().key).to.deep.equal('value2');
  });

  it('Возврящает вложенные объекты', () => {
    Store.set('test1.test2.test3', 'value');
    expect(Store.getState().test1).to.deep.equal({ test2: { test3: 'value' } });
  });

  it('Изменяет вложенные объекты', () => {
    Store.set('test1.test2', 'value2');
    expect(Store.getState().test1).to.deep.equal({ test2: 'value2' });
  });

  it('Установка значения несуществующего ключа', () => {
    Store.set('test1.test2', 'value2');
    expect(Store.getState().test1).to.deep.equal({ test2: 'value2' });
  });
});

