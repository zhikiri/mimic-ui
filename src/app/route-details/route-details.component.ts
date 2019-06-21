import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AceConfigInterface } from 'ngx-ace-wrapper';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/pastel_on_dark';

import RouteModel from '../routes-list/route.model';
import { RoutesService } from '../routes-list/routes.service';
import { MimicService } from '../shared/mimic.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {

  route: RouteModel;
  subscription: Subscription;

  public config: AceConfigInterface = {
    mode: 'json',
    theme: 'pastel_on_dark',
    readOnly : false
  };

  constructor(
    private routesService: RoutesService,
    private mimicService: MimicService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.mimicService.getRouteById(params['id']);
    })

    this.subscription = this.routesService.selectedRouteChanged
      .subscribe((route: RouteModel) => this.route = route);
  }

}
