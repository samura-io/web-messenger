import EventBus from "./EventBus";
import {v4 as makeUUID} from 'uuid';
import Handlebars from "handlebars";

export type Props = {
  [key: string]: unknown;
  events?: { [key: string]: (event: Event) => void };
}

export type BlockEventsMap = {
  [key: string]: (event: Event) => void
}

class Block {
  
  private static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };
  
  private _element: HTMLElement | null = null;

  private eventBus: () => EventBus;

  private lists: { [key: string]: Block[] } = {};
  
  protected _id: string | null = null;

  protected props: Props;

  protected children: { [key: string]: Block } = {};

  
  constructor(propsWithChildren: Props = {}) {
    const eventBus = new EventBus();
    const {props, children, lists} = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({...props, __id: this._id});
    this.children = children;
    
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    this._id = makeUUID();
    eventBus.emit(Block.EVENTS.INIT);
  }
  
  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
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
  
  componentDidMount() {}
  
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
  
  _componentDidUpdate(oldProps: Props, newProps: Props) {
    // Можно добавить проверку - если пропсы изменились,
    // то выполняем перерендер, иначе ничего не делаем
    // Но в данном случае это не реализовано
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
  };
  
  get element() {
    return this._element;
  }
  
 _render() {
    const propsAndStrubs = {...this.props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStrubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const _tmpId = Math.floor(100000 + Math.random() * 900000);
    Object.entries(this.lists).forEach(([key]) => {
      propsAndStrubs[key] = `<div data-id="__l_${key + _tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStrubs);

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement('template');
      child.forEach(item => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent());
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${key + _tmpId}"]`);
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
}
  
  render(): string {
    return "";
  }
  
  getContent() {
    if (this.element === null) {
        throw new Error("Component hasn't been rendered");
    }

    return this.element;
}
  
  _makePropsProxy(props: Props) {
    const self = this;
  
    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldProps = {...target};
        target[prop] = value;
        const newProps = {...target};

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, newProps);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);
    return element;
  }
  
  show() {
    this.getContent().style.display = "block";
  }
  
  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;