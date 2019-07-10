import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import MockModel from './mock.model';
import { Observable } from 'rxjs';
import LogRecord from './log-record.model';

export type StatusResponse = { status: boolean };

@Injectable()
export default class ApiService {

  private apiPrefix = '/mimic';

  constructor(private http: HttpClient) { }

  getMocks(): Observable<MockModel[]> {

    return this.http.get<MockModel[]>(`${this.apiPrefix}/mocks`);
  }

  getMockByHash(hash: string): Observable<MockModel> {

    return this.http.get<MockModel>(`${this.apiPrefix}/mocks/${hash}`);
  }

  getMockLogRecords(hash: string): Observable<LogRecord[]> {

    return this.http.get<LogRecord[]>(`${this.apiPrefix}/mocks/${hash}/logs`);
  }

  deleteMockByHash(hash: string): Observable<StatusResponse> {

    return this.http.delete<StatusResponse>(`${this.apiPrefix}/mocks/${hash}`);
  }

  createMock(mock: MockModel): Observable<StatusResponse> {

    return this.http.post<StatusResponse>(`${this.apiPrefix}/mocks`, JSON.stringify(mock));
  }
}
