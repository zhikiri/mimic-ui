import { Injectable } from "@angular/core";
import MockModel from '../shared/mock.model';
import { Subject } from 'rxjs';

@Injectable()
export class MocksService {

  routesChanged = new Subject<MockModel[]>();
  selectedRouteChanged = new Subject<MockModel>();

  private routes: MockModel[] = [];
  private selectedRoute: MockModel;

  setRoutes(routes: MockModel[]) {

    this.routes = routes;
    this.routesChanged.next(this.routes.slice());
  }

  setSelectedRoute(route: MockModel) {

    this.selectedRoute = route;
    this.selectedRoute.response = JSON.stringify(
      this.selectedRoute.response, null, '\t'
    );
    this.selectedRouteChanged.next({ ...this.selectedRoute });
  }

  getMocks(): MockModel[] {

    return this.routes.slice();
  }

  getSelectedRoute(): MockModel {

    return this.selectedRoute;
  }
}
