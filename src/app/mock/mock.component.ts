import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AceConfigInterface } from 'ngx-ace-wrapper';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/pastel_on_dark';

import MockModel from '../shared/mock.model';
import MocksService from '../shared/mocks.service';

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
    private mocksService: MocksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.mockSubscription = this.mocksService.getMockByHash(params['hash'])
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

    this.editedMock = { ...mock };
    this.editedMock.endpoint = mock.endpoint.substr(1);
  }

  onSave() {

    console.log(this.editedMock);
  }

  onDelete() {

    this.mocksService.deleteMock(this.selectedMock.hash);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {

    this.mockSubscription.unsubscribe();
  }
}
