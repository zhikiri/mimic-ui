import { Injectable } from "@angular/core";
import { RouteModel } from './route.model';

@Injectable()
export class RoutesService {

  private routes: RouteModel[] = [
    { method: 'get', endpoint: '/users' },
    { method: 'post', endpoint: '/products' },
    { method: 'delete', endpoint: '/orders' },
    { method: 'put', endpoint: '/carts' }
  ]

  getRoutes(): RouteModel[] {

    return this.routes.slice();
  }
}
