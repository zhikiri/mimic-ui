import { Injectable } from "@angular/core";
import RouteModel from './route.model';
import { Subject } from 'rxjs';

@Injectable()
export class RoutesService {

  routesChanged = new Subject<RouteModel[]>();
  selectedRouteChanged = new Subject<RouteModel>();

  private routes: RouteModel[] = [];
  private selectedRoute: RouteModel;

  setRoutes(routes: RouteModel[]) {

    this.routes = routes;
    this.routesChanged.next(this.routes.slice());
  }

  setSelectedRoute(route: RouteModel) {

    this.selectedRoute = route;
    this.selectedRoute.response = JSON.stringify(
      this.selectedRoute.response, null, '\t'
    );
    this.selectedRouteChanged.next({ ...this.selectedRoute });
  }

  getRoutes(): RouteModel[] {

    return this.routes.slice();
  }

  getSelectedRoute(): RouteModel {

    return this.selectedRoute;
  }
}
