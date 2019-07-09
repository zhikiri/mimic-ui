import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import MockModel from './mock.model';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

  private apiPrefix = '/mimic';

  constructor(private http: HttpClient) { }

  getMocks(): Observable<MockModel[]> {

    return this.http.get<MockModel[]>(`${this.apiPrefix}/mocks`);
  }

  getMockByHash(hash: string): Observable<MockModel> {

    return this.http.get<MockModel>(`${this.apiPrefix}/mocks/${hash}`);
  }
}
