import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import ApiService from '../shared/api.service';
import MockModel from '../shared/mock.model';

@Component({
  selector: 'app-mocks-list',
  templateUrl: './mocks-list.component.html',
  styleUrls: ['./mocks-list.component.scss']
})
export class MocksListComponent implements OnInit, OnDestroy {

  mocks: MockModel[] = [];

  mocksSubscription: Subscription;

  constructor(
    private ApiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loadMocks();
  }

  onRefresh() {

    this.loadMocks();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {

    this.mocksSubscription.unsubscribe();
  }

  private loadMocks() {

    this.mocksSubscription = this.ApiService.getMocks()
      .subscribe((mocks: MockModel[]) => this.mocks = mocks);
  }
}
