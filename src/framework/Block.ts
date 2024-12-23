import EventBus from './EventBus.ts';
import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import cloneDeep from '../utils/cloneDeep.ts';

export type Props = {
  [key: string]: unknown;
  events?: { [key: string]: (event: Event) => void };
};

export type BlockEventsMap = {
  [key: string]: (event: Event) => void
};

class Block {
  
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
    FLOW_UNMOUNT: 'flow:component-will-unmount',
  };
  
  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  public lists: { [key: string]: Block[] } = {};
  
  protected _id: string | null = null;

  public props: Props;

  public children: { [key: string]: Block } = {};

  private _renderCount: number = 0;

  protected _initialProps: Props = {};

  
  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    this._registerEvents(eventBus);
    this.eventBus = () => eventBus;
    
    this._id = makeUUID();

    const { props, children, lists } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = children;
    this.lists = lists;
    this._renderCount = 0;

    eventBus.emit(Block.EVENTS.INIT);
  }
  
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_UNMOUNT, this._componentWillUnmount.bind(this));
  }
  
  init() {  
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }
  
  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  _getChildrenAndProps(childrenAndProps: Props) {
    const props: Props = {};
    const children: { [key: string]: Block } = {};
    const lists: { [key: string]: Block[] } = {};
  
    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value[0] instanceof Block) {
        lists[key] = value;
      } else {
        props[key] = value;
      }
    }); 
  
    return { props, children, lists };
  }
  
  componentDidMount(): void | (() => void) {
    return () => {
    };
  }
  
  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _addEvents(): void {
    const { events } = this.props;

    if (!events) {
      return;
    }

    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });

  }

  removeEvents() {
    this.eventBus().emit(Block.EVENTS.FLOW_UNMOUNT);

    const { events } = this.props;
    if (!events) {
      return;
    }

    Object.keys(events).forEach(eventName => {
      if (this._element) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }

  _componentWillUnmount() {
    const fallback = this.componentDidMount();
    if (typeof fallback === 'function') {
      fallback();
    }
  }
  
  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }


  // Метод жля изменения аттрибутов элемента
  // Например, поменять цвет кнопки не перерисовывая компонент
  addAttributes() {
    const { attr = {} } = this.props;
    Object.entries(attr as { [s: string]: unknown }).forEach(([key, value]) => {
      if (this.element) {
        this.element.setAttribute(key, value as string);
      }
    });
  }
  
  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (oldProps) {
      // Используйте oldProps в своей логике здесь
    }
  
    if (newProps) {
      // Используйте newProps в своей логике здесь
    }
    
    return true;
  }
  
  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    const { props, children, lists } = this._getChildrenAndProps(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.lists, lists);
    Object.assign(this.children, children);

    this._render();
  };
  
  get element() {
    return this._element;
  }
  
  _render() {
    const propsAndStrubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStrubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.lists).forEach(([key]) => {
      propsAndStrubs[key] = `<div data-id="__l_${key + tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStrubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template') as HTMLTemplateElement;
      child.forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(item);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${key + tmpId}"]`);
      if (stub) {
        stub.replaceWith(listCont.content);
      }
    });

    const newElement = fragment.content.firstElementChild as HTMLElement;
    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;
    this._addEvents();
    this.addAttributes();

    if (this._renderCount === 0) {
      this._initialProps = { ...this.props, ...this.children, ...this.lists };
    }
    this._renderCount++;
  }
  
  render(): string {

    return '';
  }
  
  getContent() {
    if (this.element === null) {
      throw new Error("Component hasn't been rendered");
    }

    return this.element;
  }
  
  _makePropsProxy(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
  
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldProps = cloneDeep(target); 
        target[prop] = cloneDeep(value);
        const newProps = cloneDeep(target);
  
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  createRef(elementId: string) {
    return this._element?.querySelector(`#${elementId}`) || this._element;
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    return element;
  }
  
  show() {
    
  }
  
  hide() {
    
  }

  resetState() {
    this.removeEvents();
    const { props, children, lists } = this._getChildrenAndProps(this._initialProps);
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    this.children = children;
    this.lists = lists;

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.dispatchComponentDidMount();
  }
}

export default Block;
