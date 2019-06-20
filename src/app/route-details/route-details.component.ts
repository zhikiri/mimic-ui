import { Component, OnInit } from '@angular/core';
import RouteModel from '../routes-list/route.model';
import { Subscription } from 'rxjs';
import { RoutesService } from '../routes-list/routes.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {

  route: RouteModel;
  subscription: Subscription;

  constructor(
    private routesService: RoutesService
  ) { }

  ngOnInit() {

    this.subscription = this.routesService.selectedRouteChanged
      .subscribe((route: RouteModel) => this.route = route);
  }

}
