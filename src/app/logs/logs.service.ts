import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import LogRecordModel from '../shared/log-record.model';
import ApiService from '../shared/api.service';

@Injectable()
export default class LogsService {

  public logsChanged = new Subject<LogRecordModel[]>();

  private logs: LogRecordModel[] = [];

  constructor(private apiService: ApiService) { }

  public getLogsByHash(hash: string): Subject<LogRecordModel[]> {

    this.apiService
      .getMockLogRecords(hash)
      .subscribe((logs: LogRecordModel[]) => this.setLogs(logs));

    return this.logsChanged;
  }

  public setLogs(logs: LogRecordModel[]): void {

    this.logs = logs;
    this.logsChanged.next(this.logs.slice());
  }
}
