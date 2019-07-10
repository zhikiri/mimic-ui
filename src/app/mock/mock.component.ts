import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { AceConfigInterface } from 'ngx-ace-wrapper';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/pastel_on_dark';

import MockModel from '../shared/mock.model';
import ApiService, { StatusResponse } from '../shared/api.service';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit, OnDestroy {

  mockSubscription: Subscription;

  selectedMock: MockModel;
  editedMock: MockModel;

  constructor(
    private ApiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.mockSubscription = this.ApiService.getMockByHash(params['hash'])
        .subscribe((mock: MockModel) => {
          this.selectedMock = mock;
          this.setEditedMock(mock);
        });
    });
  }

  getResponseEditorConfig(): AceConfigInterface {

    return { mode: 'json', theme: 'pastel_on_dark', readOnly: false };
  }

  setEditedMock(mock: MockModel) {

    this.editedMock = mock;
    this.editedMock.endpoint = mock.endpoint.slice(1);
    this.editedMock.response = JSON.stringify(mock.response, null, '\t');
  }

  onSave() {

    if (this.isNewMockRequired()) {
      // todo : call delete mock and create after
    }
    // todo : call create mock

    console.log(this.editedMock);
  }

  ngOnDestroy() {

    this.mockSubscription.unsubscribe();
  }

  private isNewMockRequired(): boolean {

    return this.selectedMock.endpoint !== this.editedMock.endpoint
      || this.selectedMock.httpMethod !== this.editedMock.httpMethod;
  }
}
