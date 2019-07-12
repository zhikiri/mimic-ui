import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import MockModel from './mock.model';
import LogRecordModel from './log-record.model';

export type StatusResponse = { status: boolean };

@Injectable()
export default class ApiService {

  private apiPrefix = '/mimic';

  public constructor(
    private http: HttpClient
  ) { }

  public getMocks(): Observable<MockModel[]> {

    return this.http.get<MockModel[]>(`${this.apiPrefix}/mocks`);
  }

  public getMockByHash(hash: string): Observable<MockModel> {

    return this.http.get<MockModel>(`${this.apiPrefix}/mocks/${hash}`);
  }

  public getMockLogRecords(hash: string): Observable<LogRecordModel[]> {

    return this.http.get<LogRecordModel[]>(`${this.apiPrefix}/mocks/${hash}/logs`);
  }

  public deleteMockByHash(hash: string): Observable<MockModel> {

    return this.http.delete<MockModel>(`${this.apiPrefix}/mocks/${hash}`);
  }

  public createMock(mock: MockModel): Observable<MockModel> {

    return this.http.post<MockModel>(
      `${this.apiPrefix}/mocks`,
      mock,
      {
        headers: { "Content-type": "application/json" }
      }
    );
  }

  public updateMock(mock: MockModel): Observable<MockModel> {

    return this.http.put<MockModel>(
      `${this.apiPrefix}/mocks/${mock.hash}`,
      mock,
      {
        headers: {"Content-type": "application/json"}
      }
    );
  }
}
