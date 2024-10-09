import Block from './Block';
import Route from './Route';

class Router {
  routes: Route[] = [];

  history: History = window.history;

  _currentRoute: Route | null = null;

  _rootQuery: string = '';

  private static _instance: Router;

  constructor(rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }
    
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  use(pathname: string, block: new () => Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }
  

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.pathname === pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

}

export default Router;
