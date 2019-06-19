import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoutesService } from '../routes-list/routes.service';
import { RouteModel } from '../routes-list/route.model';

export interface MimicRoute {
  id: number;
  method: "get" | "post" | "put" | "delete";
  path: string;
}

type GetRouteResponse = { routes: MimicRoute[] };

@Injectable()
export class MimicService {

  constructor(
    private httpClient: HttpClient,
    private routesService: RoutesService
  ) { }

  getRoutes() {

    const url = this.getRequestURL('/routes');
    this.httpClient.get<GetRouteResponse>(url).subscribe((resp: GetRouteResponse) => {

      const models = resp.routes.map((route: MimicRoute): RouteModel => {

        return { method: route.method, endpoint: route.path };
      });
      this.routesService.setRoutes(models);
    });
  }

  private getRequestURL(endpoint: string): string {

    return `/mimic${endpoint}`;
  }
}
