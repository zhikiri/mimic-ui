import { Component, OnInit } from '@angular/core';
import { RoutesService } from './routes.service';
import { RouteModel } from './route.model';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  private routes: RouteModel[];

  constructor(private routesService: RoutesService) { }

  ngOnInit() {

    this.routes = this.routesService.getRoutes();
  }

}
