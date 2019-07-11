import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import MockModel from './mock.model';
import ApiService from './api.service';

@Injectable()
export default class MocksService {

  public mocksChanged = new Subject<MockModel[]>();
  public mockSelectionChanged = new Subject<MockModel>();

  private mocks: MockModel[] = [];
  private selectedMock: MockModel = null;

  constructor(private apiService: ApiService) { }

  public loadMocks(): Subject<MockModel[]> {

    this.apiService.getMocks().subscribe((mocks: MockModel[]) => this.setMocks(mocks));
    return this.mocksChanged;
  }

  public getMockByHash(hash: string): Subject<MockModel> {

    this.apiService.getMockByHash(hash).subscribe((mock: MockModel) => {

      mock.response = JSON.stringify(mock.response, null, '\t');
      this.setSelectedMock(mock)
    });
    return this.mockSelectionChanged;
  }

  public setMocks(mocks: MockModel[]): void {

    this.mocks = mocks;
    this.mocksChanged.next(this.mocks.slice());
  }

  public setSelectedMock(mock: MockModel | null): void {

    this.selectedMock = mock;
    this.mockSelectionChanged.next(!mock ? null : { ...mock });
  }

  public deleteMock(hash: string): void {

    this.apiService.deleteMockByHash(hash).subscribe(() => {

      this.setMocks(this.mocks.filter((mock: MockModel) => mock.hash !== hash));
    });
  }
}
