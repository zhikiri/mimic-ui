import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import MockModel from './mock.model';
import LogRecordModel from './log-record.model';
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

  public getMockLogsByHash(hash: string): Observable<LogRecordModel[]> {

    return this.apiService.getMockLogRecords(hash).pipe(
      map(this.getSortedLogs),
      map(this.getFormattedLogs)
    );
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

  private getSortedLogs(logs: LogRecordModel[]): LogRecordModel[] {

    logs.sort((a: LogRecordModel, b: LogRecordModel) => {
      if (a.timestamp > b.timestamp) {
        return -1;
      } else if (a.timestamp < b.timestamp) {
        return 1;
      }
      return 0;
    });
    return logs;
  }

  private getFormattedLogs(logs: LogRecordModel[]): LogRecordModel[] {

    return logs.map((log: LogRecordModel) => {

      const date = new Date(Math.round(log.timestamp / 1000) * 1000);
      const result = { date: date.toLocaleString(), ...log };
      delete result.timestamp;

      return result;
    });
  }
}
