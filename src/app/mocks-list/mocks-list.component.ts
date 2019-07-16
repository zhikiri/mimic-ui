import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import MockModel from '../shared/mock.model';
import MocksService from '../shared/mocks.service';

@Component({
  selector: 'app-mocks-list',
  templateUrl: './mocks-list.component.html',
  styleUrls: ['./mocks-list.component.scss']
})
export class MocksListComponent implements OnInit {

  mocks: MockModel[] = [];

  constructor(
    private mocksService: MocksService,
    private router: Router
  ) { }

  ngOnInit() {

    this.mocksService.loadMocks().subscribe((mocks: MockModel[]) => this.mocks = mocks);
  }

  onRefresh() {

    this.mocksService.loadMocks().subscribe(() => this.router.navigate(['/']));
  }
}
