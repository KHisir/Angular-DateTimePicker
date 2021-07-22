import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { EditorComponent } from './editor/editor.component';
import { DateType, PickerTriggerType, PickerType, SelectMode } from './helper/enums';
import { DtPickerValidator } from './helper/validator';
import { PickerResult } from './model/pickerResult';
import { PreConfiguredDate, PreConfiguredDateSelection, PreConfiguredDateType, PreConfiguredDateResult } from './model/preConfiguredDateManager';

@Component({
  selector: 'app-cc-date-time-picker',
  templateUrl: './cc-date-time-picker.component.html',
  styleUrls: ['./cc-date-time-picker.component.scss']
})
export class CcDateTimePickerComponent implements OnInit {

  // Parent to Child: Sharing Data via Input
  @Input() from: Date|Moment = new Date();
  @Input() to: Date|Moment = new Date();
  @Input() selectMode: SelectMode = SelectMode.Range;
  @Input() pickerType: PickerType = PickerType.DateTime;
  @Input() pickerTriggerType: PickerTriggerType = PickerTriggerType.Button;

  lang: string = '';
  get allowDay(): string {
    return this.lang;
  }
  @Input() set language(value: string) {
    this.lang = value;
    this.init();
  }

  // Child to Parent: Sharing Data via Output() and EventEmitter
  @Output() onchanged = new EventEmitter<any>();

  From!: Moment;
  To!: Moment;
  FromOrigin!: Moment;
  ToOrigin!: Moment;

  pickerIsEnabled: boolean = false;
  preconfiguredDateSelection: PreConfiguredDate[] = new PreConfiguredDateSelection().List;
  currentDateType: DateType = DateType.From;

  SelectMode: any = SelectMode;
  PickerType: any = PickerType;
  DateType: any = DateType;
  PickerTriggerType: any = PickerTriggerType;
  PreConfiguredDateType: any = PreConfiguredDateType;

  @ViewChild('childFrom', {static: false}) childFrom!: EditorComponent;
  @ViewChild('childTo', {static: false}) childTo!: EditorComponent;

  constructor() {
    this.init();
  }

  ngOnInit() {}

  init(): void {
    // localization
    const lang: string = DtPickerValidator.isNullOrEmpty(this.lang) ? navigator.language.substr(0, 2) : this.lang;
    moment.locale(lang);

    this.From = this.validateDate(this.from);
    this.To = this.validateDate(this.to);

    this.dateNormalization();

    this.FromOrigin = this.From.clone();
    this.ToOrigin = this.To.clone();
  }

  validateDate(dt: Date|Moment): Moment {
    if (DtPickerValidator.isNullOrEmpty(dt)) {
      return moment();
    } else {
      if (dt instanceof Date) {
        return moment(dt);
      } else {
        return dt;
      }
    }
  }

  dateNormalization() {
    if (this.selectMode === SelectMode.Range) {
      switch (this.pickerType) {
        case PickerType.Year:
          this.From = this.From.startOf('year');
          this.To = this.To.endOf('year');
          break;
        case PickerType.Month:
          this.From = this.From.startOf('month');
          this.To = this.To.endOf('month');
          break;
        case PickerType.Week:
          this.From = this.From.startOf('isoWeek');
          this.To = this.To.endOf('isoWeek');
          break;

        default:
          break;
      }
    } else {
      switch (this.pickerType) {
        case PickerType.Year:
          this.From = this.From.startOf('year');
          break;
        case PickerType.Month:
          this.From = this.From.startOf('month');
          break;
        case PickerType.Week:
          this.From = this.From.startOf('isoWeek');
          break;

        default:
          break;
      }
    }
  }

  preconfiguredDateOnClicked(item: PreConfiguredDate): void {
    const res: PreConfiguredDateResult = item.onChange();
    this.From = res.From;
    this.To = res.To;

    setTimeout(() => {
      if (this.currentDateType === DateType.From) {
        this.childFrom.handleScrollAnimation();
      } else {
        this.childTo.handleScrollAnimation();
      }
    }, 1);
  }

  sidebarEnabled(): boolean {
    if (this.selectMode === SelectMode.Range && (this.pickerType === PickerType.DateTime || this.pickerType === PickerType.Date)) {
      return true;
    } else {
      return false;
    }
  }

  openPicker(): void {
    // this.from = new Date();
    // this.to = new Date();
    // this.selectMode = SelectMode.Range;
    // this.pickerType = PickerType.DateTime;
    // this.pickerTriggerType = PickerTriggerType.Button;

    this.currentDateType = DateType.From;
    this.pickerIsEnabled = true;
  }

  cancel(): void {
    this.pickerIsEnabled = false;
  }

  apply(): void {
    this.FromOrigin = this.From;
    this.ToOrigin = this.To;

    this.from = this.From.toDate();
    this.to = this.To.toDate();

    this.onchanged.emit(new PickerResult(this.From, this.To));
    this.pickerIsEnabled = false;
  }
}
