import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AceConfigInterface, AceComponent } from 'ngx-ace-wrapper';

import 'brace';
import 'brace/mode/json';
import 'brace/theme/pastel_on_dark';

import MockModel from '../shared/mock.model';
import MocksService from '../shared/mocks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss']
})
export class MockComponent implements OnInit {

  @ViewChild('editor', { static: false }) editor: AceComponent;

  mockSubscription: Subscription;

  selectedMock: MockModel;

  constructor(
    private mocksService: MocksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {

      if (this.mockSubscription) {
        this.mockSubscription.unsubscribe();
      }

      this.mockSubscription = this.mocksService.getMockByHash(params['hash'])
        .subscribe((mock: MockModel) => {

          console.log('updated');
          this.selectedMock = mock;
        });
    });
  }

  getResponseEditorConfig(): AceConfigInterface {

    return { mode: 'json', theme: 'pastel_on_dark', readOnly: false };
  }

  onSave() {

    this.mocksService.updateMock({
      ...this.selectedMock, response: JSON.parse(this.selectedMock.response)
    }).subscribe((mock: MockModel) => {
      setTimeout(() => {

        this.router.navigateByUrl(`/mocks/${mock.hash}`);
        this.mocksService.loadMocks();
      }, 1500);
    });
  }

  onDelete() {

    this.mocksService.deleteMock(this.selectedMock.hash);
    this.router.navigate(['/']);
  }
}
