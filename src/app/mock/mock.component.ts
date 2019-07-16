import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AceConfigInterface, AceComponent } from 'ngx-ace-wrapper';

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
export class MockComponent implements OnInit {

  @ViewChild('editor', { static: false }) editor: AceComponent;

  selectedMock: MockModel;

  public constructor(
    private mocksService: MocksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {

      if (params.hash === 'new') {

        this.setSelectedMock({ httpMethod: 'get', endpoint: '/', hash: null, response: {} });
        return;
      }

      this.mocksService.getMockByHash(params.hash)
        .subscribe((mock: MockModel) => this.setSelectedMock(mock));
    });
  }

  public getResponseEditorConfig(): AceConfigInterface {

    return { mode: 'json', theme: 'pastel_on_dark', readOnly: false };
  }

  public onSave(): void {

    this.mocksService.saveMock({
      ...this.selectedMock,
      endpoint: `/${this.selectedMock.endpoint}`,
      response: JSON.parse(this.selectedMock.response)
    }).subscribe((mock: MockModel) => {
      setTimeout(() => {

        this.router.navigateByUrl(`/mocks/${mock.hash}`);
        this.mocksService.loadMocks();
      }, 1500);
    });
  }

  public onDelete(): void {

    this.mocksService.deleteMock(this.selectedMock.hash);
    this.router.navigate(['/']);
  }

  private setSelectedMock(mock: MockModel): void {

    this.selectedMock = mock;
    if (mock.endpoint.startsWith('/')) {
      this.selectedMock.endpoint = mock.endpoint.substr(1);
    }
    this.selectedMock.response = JSON.stringify(mock.response, null, '\t');
  }
}
