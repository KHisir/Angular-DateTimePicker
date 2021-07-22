import { Component, Input, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { PickerType } from '../helper/enums';

@Component({
  selector: 'app-timestamp-text',
  templateUrl: './timestamp-text.component.html',
  styleUrls: ['./timestamp-text.component.scss']
})
export class TimestampTextComponent implements OnInit {
  @Input() dt!: Moment;
  @Input() pickerType!: PickerType;

  PickerType: any = PickerType;
  
  constructor() { }

  ngOnInit() {
  }

}
