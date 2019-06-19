import { Injectable } from "@angular/core";
import { RouteModel } from './route.model';
import { Subject } from 'rxjs';

@Injectable()
export class RoutesService {

  routesChanged = new Subject<RouteModel[]>();

  private routes: RouteModel[] = [
    { method: 'get', endpoint: '/users' },
    { method: 'post', endpoint: '/products' },
    { method: 'delete', endpoint: '/orders' },
    { method: 'put', endpoint: '/carts' }
  ]

  setRoutes(routes: RouteModel[]) {

    this.routes = routes;
    this.routesChanged.next(this.routes.slice());
  }

  getRoutes(): RouteModel[] {

    return this.routes.slice();
  }
}
