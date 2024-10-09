import Block from './Block';

type TRouteProps<T = unknown> = {
  [key: string] : T
};

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
};

const unmount = (query: string) => {
  const root = document.querySelector(query);
  
  if (root) {
    root.innerHTML = '';
  }
};

class Route {

  public pathname: string;

  private _blockClass: new () => Block;

  private _block: Block | null = null;

  private _props: TRouteProps;

  constructor(pathname: string, view: new () => Block, props: TRouteProps) {
    this.pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  private _match(pathname: string) {
    return this.pathname === pathname;
  }

  public navigate(pathname: string) {
    if (this._match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  public render() {
    if (!this._block) {
      this._block = new this._blockClass();
      if (typeof this._props.rootQuery === 'string') {
        render(this._props.rootQuery, this._block);
      }
      return;
    }

    if (typeof this._props.rootQuery === 'string') {
      render(this._props.rootQuery, this._block);
    }
  }

  public leave() {
    if (this._block) {

      this._block.hide();
      this._block.removeEvents();
      
      if (typeof this._props.rootQuery === 'string') {
        unmount(this._props.rootQuery);
      }
    }
  }
}

export default Route;
