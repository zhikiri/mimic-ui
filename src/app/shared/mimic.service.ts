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

    const url = this.getRequestURL('/routes');
    this.httpClient.get<GetRouteResponse>(url).subscribe(
      (resp: GetRouteResponse) => this.routesService.setRoutes(resp.routes)
    );
  }

  getRouteById(id: string) {

    const url = this.getRequestURL(`/routes/${id}`);
    this.httpClient.get<RouteModel>(url).subscribe(
      (route: RouteModel) => this.routesService.setSelectedRoute(route)
    );
  }

  private getRequestURL(endpoint: string): string {

    return `/mimic${endpoint}`;
  }
}
