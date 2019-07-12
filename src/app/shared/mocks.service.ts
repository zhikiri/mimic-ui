import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import MockModel from './mock.model';
import ApiService from './api.service';

@Injectable()
export default class MocksService {

  public mocksChanged = new Subject<MockModel[]>();

  private mocks: MockModel[] = [];

  constructor(private apiService: ApiService) { }

  public loadMocks(): Subject<MockModel[]> {

    this.apiService.getMocks().subscribe((mocks: MockModel[]) => this.setMocks(mocks));
    return this.mocksChanged;
  }

  public getMockByHash(hash: string): Observable<MockModel> {

    return this.apiService.getMockByHash(hash);
  }

  public saveMock(mock: MockModel): Observable<MockModel> {

    return mock.hash === null
      ? this.apiService.createMock(mock)
      : this.apiService.updateMock(mock);
  }

  public setMocks(mocks: MockModel[]): void {

    this.mocks = mocks;
    this.mocksChanged.next(this.mocks.slice());
  }

  public deleteMock(hash: string): void {

    this.apiService.deleteMockByHash(hash).subscribe(() => {

      this.setMocks(this.mocks.filter((mock: MockModel) => mock.hash !== hash));
    });
  }
}
