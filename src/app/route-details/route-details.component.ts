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
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {

  public config: AceConfigInterface = {
    mode: 'json',
    theme: 'pastel_on_dark',
    readOnly : false
  };

  route: RouteModel;
  subscription: Subscription;

  endpoint = new FormControl('');

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
      .subscribe((route: RouteModel) => {
        this.route = route;
        this.endpoint.setValue(route.endpoint.slice(1));
      });
  }

  onSave() {

    this.route.endpoint = `/${this.endpoint.value}`;
    console.log(this.route);
  }

}
