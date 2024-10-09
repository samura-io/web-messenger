import Block from './Block';

type TRouteProps<T = unknown> = {
  [key: string] : T
};

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
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

    this._block.show();
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }
}

export default Route;
