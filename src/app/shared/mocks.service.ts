import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import MockModel from './mock.model';
import ApiService from './api.service';

@Injectable()
export default class MocksService {

  public mocksChanged = new Subject<MockModel[]>();

  private mocks: MockModel[] = [];

  constructor(private apiService: ApiService) { }

  public loadMocks(): void {

    this.apiService.getMocks().subscribe((mocks: MockModel[]) => this.setMocks(mocks));
  }

  public setMocks(mocks: MockModel[]): void {

    this.mocks = mocks;
    this.mocksChanged.next(this.mocks.slice());
  }

  public getMocks(): MockModel[] {

    return this.mocks;
  }

  public deleteMock(hash: string): void {

    this.apiService.deleteMockByHash(hash).subscribe(() => {

      this.setMocks(this.mocks.filter((mock: MockModel) => mock.hash !== hash));
    });
  }
}
