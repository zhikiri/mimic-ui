import { Component, OnInit } from '@angular/core';
import { RoutesService } from './routes.service';
import { RouteModel } from './route.model';
import { Subscription } from 'rxjs';
import { MimicService } from '../shared/mimic.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  routes: RouteModel[];
  subscription: Subscription;

  constructor(
    private routesService: RoutesService,
    private mimicService: MimicService
  ) { }

  ngOnInit() {

    this.mimicService.getRoutes();

    this.subscription = this.routesService.routesChanged
      .subscribe((routes: RouteModel[]) => this.routes = routes);

    this.routes = this.routesService.getRoutes();
  }

  onRouteSelect(route: RouteModel) {

    this.mimicService.getRouteById(route.id);
  }

  onRefresh() {

    this.mimicService.getRoutes();
  }

}
