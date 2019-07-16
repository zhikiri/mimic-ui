import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-method-select',
  templateUrl: './method-select.component.html',
  styleUrls: ['./method-select.component.scss']
})
export class MethodSelectComponent implements OnInit {
  @Output() methodSelect = new EventEmitter<string>();
  @Input() selectedMethod: string;

  inSelectionMode = false;
  methods = ['get', 'post', 'put', 'delete'];

  constructor() { }

  ngOnInit() {
  }

  onSelect(method: string) {

    this.methodSelect.emit(method);
    this.inSelectionMode = false;
  }

}
