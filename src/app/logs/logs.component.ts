import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import LogsService from './logs.service';
import LogRecordModel from '../shared/log-record.model';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  selectedLogs: LogRecordModel[];

  constructor(
    private logsService: LogsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params: Params) => {

      this.logsService.getLogsByHash(params.hash)
        .subscribe((logs: LogRecordModel[]) => this.selectedLogs = logs);
    })
  }
}
