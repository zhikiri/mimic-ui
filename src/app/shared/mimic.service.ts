import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../routes-list/routes.service';
import RouteModel from '../routes-list/route.model';

type GetRouteResponse = { routes: RouteModel[] };

@Injectable()
export class MimicService {

  constructor(
    private httpClient: HttpClient,
    private routesService: RoutesService
  ) { }

  getRoutes() {

    const url = this.getRequestURL('/mocks');
    this.httpClient.get<RouteModel[]>(url).subscribe(
      (resp: RouteModel[]) => this.routesService.setRoutes(resp)
    );
  }

  getRouteById(id: string) {

    const url = this.getRequestURL(`/mocks/${id}`);
    this.httpClient.get<RouteModel>(url).subscribe(
      (route: RouteModel) => this.routesService.setSelectedRoute(route)
    );
  }

  private getRequestURL(endpoint: string): string {

    return `/mimic${endpoint}`;
  }
}
