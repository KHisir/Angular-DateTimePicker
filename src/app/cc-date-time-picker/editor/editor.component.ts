import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PickerType, MomentFormat } from '../helper/enums';
import { FormatManager } from '../helper/formatManager';
import { ScrollTo } from '../helper/scrollTo';
import { DtPickerValidator } from '../helper/validator';
import { Day } from '../model/date/day';
import { Month } from '../model/date/month';
import { Week } from '../model/date/week';
import { Year } from '../model/date/year';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('yearContainer', { static: false })
  yearContainerElem!: ElementRef;

  @ViewChild('monthContainer', { static: false })
  monthContainerElem!: ElementRef;

  @ViewChild('dayContainer', { static: false })
  dayContainerElem!: ElementRef;

  daysInMonth: Day[] = [];
  monthsInYear: Month[] = [];
  years: number[] = [];
  weeksInMonth: Week[] = [];

  inputDate: string = '';
  inputDateIsInvalid: boolean = false;
  PickerType: any = PickerType;

  private type: PickerType = PickerType.DateTime;
  public get pickerType(): PickerType {
    return this.type;
  }

  @Input()
  public set pickerType(value: PickerType) {
    this.type = value;
    this.handleContainerVisibility();
  }

  private dtObj: Moment = moment();
  public get dt(): Moment {
    return this.dtObj;
  }

  @Input()
  public set dt(value: Moment) {
    this.dtObj = value;
    this.dtObj.set('millisecond', 0);

    this.daysInMonth = Day.getDaysInMonth(this.dt.year(), this.dt.month());
    this.monthsInYear = Month.getMonthsInYear(); // moment.months();
    this.years = Year.getYears();
    this.weeksInMonth = Week.getWeeksInMonth(this.dt);

    // this.inputDate = this.dt.clone().format(MomentFormat.DateTime);
    this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
  }

  showYearContainer: boolean = false;
  showMonthContainer: boolean = false;
  showDayContainer: boolean = false;
  showWeekContainer: boolean = false;
  showDateContainer: boolean = false;
  showTimeContainer: boolean = false;
  showInputContainer: boolean = false;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.handleScrollAnimation();
  }

  inputOnChange(e: any): void {
    const val = moment(this.inputDate, this.getInputFormat(), true);

    if (DtPickerValidator.isValidDate(val) === true) {
      // this.dt = val.clone();
      this.dt.set('year', val.year());
      this.dt.set('month', val.month());
      this.dt.set('date', val.date());
      this.dt.set('hour', val.hour());
      this.dt.set('minute', val.minute());
      this.dt.set('second', val.second());
      this.dt.set('millisecond', val.millisecond());

      this.handleScrollAnimation();
      this.inputDateIsInvalid = false;
    } else {
      this.inputDateIsInvalid = true;
    }
  }

  yearOnChange(year: number): void {
    this.dt.set('year', year);

    if (this.showDayContainer) {
      this.daysInMonth = Day.getDaysInMonth(this.dt.year(), this.dt.month());
    }

    if (this.showWeekContainer) {
      this.weeksInMonth = Week.getWeeksInMonth(this.dt);
    }

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  monthOnChange(month: Month): void {
    this.dt.set('month', month.Number);

    if (this.showDayContainer) {
      this.daysInMonth = Day.getDaysInMonth(this.dt.year(), this.dt.month());
    }

    if (this.showWeekContainer) {
      this.weeksInMonth = Week.getWeeksInMonth(this.dt);
    }

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  dayOnChange(day: Day): void {
    this.dt.set('date', day.Number);

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  weekOnChange(week: Week): void {
    this.dt.isoWeek(week.WeekNr);

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  hoursOnChanged(e: any): void {
    this.dt.set('hour', e.target.value);

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  minuteOnChanged(e: any): void {
    this.dt.set('minute', e.target.value);

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  setNow(): void {
    const val = moment();
    this.dt.set('year', val.year());
    this.dt.set('month', val.month());
    this.dt.set('date', val.date());
    this.dt.set('hour', val.hour());
    this.dt.set('minute', val.minute());
    this.dt.set('second', 0);
    this.handleScrollAnimation();

    if (this.showInputContainer) {
      this.inputDate = moment(this.dt.clone(), MomentFormat.DateTime, true).format(FormatManager.getFormatByPickerType(this.pickerType));
      this.inputDateIsInvalid = false;
    }
  }

  getInputFormat(): string[] {
    /*
      International Standards:  YYYY-MM-DD 2007-08-31 16:47:00
      DE, TR:                   DD.MM.YYYY 31.08.2007 16:47:00
      IT:                       DD/MM/YYYY 31/08/2007 16:47:00
      EN:                       MM/DD/YYYY 08/31/2007 16:47:00
    */

    if (moment.locale() === 'de' || moment.locale() === 'tr') {
      return [
        'DD.MM.YYYY HH:mm:ss.SSS',
        'DD.MM.YYYY HH:mm:ss',
        'DD.MM.YYYY h:m:s',
        'DD.MM.YYYY HH:mm',
        'DD.MM.YYYY h:m',
        'DD.MM.YY HH:mm:ss',
        'DD.MM.YY h:m:s',
        'DD.MM.YY HH:mm',
        'DD.MM.YY h:m',
        'DD.MM.YY',
        'DD.MM.YYYY',
      ];
    }
    if (moment.locale() === 'en-gb' || moment.locale() === 'it') {
      return [
        'DD/MM/YYYY HH:mm:ss.SSS',
        'DD/MM/YYYY HH:mm:ss',
        'DD/MM/YYYY h:m:s',
        'DD/MM/YYYY HH:mm',
        'DD/MM/YYYY h:m',
        'DD/MM/YY HH:mm:ss',
        'DD/MM/YY h:m:s',
        'DD/MM/YY HH:mm',
        'DD/MM/YY h:m',
        'DD/MM/YY',
        'DD/MM/YYYY',
      ];
    } else if (moment.locale() === 'en') {
      return [
        'MM/DD/YYYY HH:mm:ss.SSS',
        'MM/DD/YYYY HH:mm:ss',
        'MM/DD/YYYY h:m:s',
        'MM/DD/YYYY HH:mm',
        'MM/DD/YYYY h:m',
        'MM/DD/YY HH:mm:ss',
        'MM/DD/YY h:m:s',
        'MM/DD/YY HH:mm',
        'MM/DD/YY h:m',
        'MM/DD/YY',
        'MM/DD/YYYY',
      ];
    } else {
      return [
        'MM/DD/YYYY HH:mm:ss.SSS',
        'MM/DD/YYYY HH:mm:ss',
        'MM/DD/YYYY h:m:s',
        'MM/DD/YYYY HH:mm',
        'MM/DD/YYYY h:m',
        'MM/DD/YY HH:mm:ss',
        'MM/DD/YY h:m:s',
        'MM/DD/YY HH:mm',
        'MM/DD/YY h:m',
        'MM/DD/YY',
        'MM/DD/YYYY',
      ];
    }
  }

  getDateFormatExampleByCountry(): string {
    if (moment.locale() === 'de' || moment.locale() === 'tr') {
      return 'DD.MM.YYYY HH:mm:ss';
    } else if (moment.locale() === 'en-gb' || moment.locale() === 'it') {
      return 'DD/MM/YYYY HH:mm:ss';
    } else if (moment.locale() === 'en') {
      return 'MM/DD/YYYY HH:mm:ss';
    } else {
      return 'MM/DD/YYYY HH:mm:ss';
    }
  }

  handleScrollAnimation(): void {
    if (this.showYearContainer === true && !DtPickerValidator.isNullOrEmpty(this.yearContainerElem)) {
      const elem: HTMLElement = document.getElementById('#' + this.dt.year())!;

      if (DtPickerValidator.isNullOrEmpty(this.yearContainerElem.nativeElement.scrollTo)) {
        // For IE Edge v12 -v18
        ScrollTo.scrollTo(this.yearContainerElem.nativeElement, elem.offsetTop - (this.yearContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5));
      } else {
        this.yearContainerElem.nativeElement.scrollTo({
          top: elem.offsetTop - (this.yearContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5),
          left: 0,
          behavior: 'smooth'
        });
      }
    }

    if (this.showMonthContainer && !DtPickerValidator.isNullOrEmpty(this.monthContainerElem)) {
      const elem: HTMLElement = document.getElementById('#' + this.dt.month())!;
      if (DtPickerValidator.isNullOrEmpty(this.monthContainerElem.nativeElement.scrollTo)) {
        // For IE Edge v12 -v18
        ScrollTo.scrollTo(this.monthContainerElem.nativeElement, elem.offsetTop - (this.monthContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5));
      } else {
        this.monthContainerElem.nativeElement.scrollTo({
          top: elem.offsetTop - (this.monthContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5),
          left: 0,
          behavior: 'smooth'
        });
      }
    }

    if (this.showDayContainer && !DtPickerValidator.isNullOrEmpty(this.dayContainerElem)) {
      const elem: HTMLElement = document.getElementById('#' + this.dt.date())!;
      if (DtPickerValidator.isNullOrEmpty(this.dayContainerElem.nativeElement.scrollTo)) {
        // For IE Edge v12 -v18
        ScrollTo.scrollTo(this.dayContainerElem.nativeElement, elem.offsetTop - (this.dayContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5));
      } else {
        this.dayContainerElem.nativeElement.scrollTo({
          top: elem.offsetTop - (this.dayContainerElem.nativeElement.querySelector('ul').children[0].offsetTop + 87.5),
          left: 0,
          behavior: 'smooth'
        });
      }
    }
  }

  handleContainerVisibility() {
    switch (this.pickerType) {
      case PickerType.DateTime:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = true;
        this.showDayContainer = true;
        this.showWeekContainer = false;
        this.showTimeContainer = true;
        this.showInputContainer = true;
        break;

      case PickerType.Date:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = true;
        this.showDayContainer = true;
        this.showWeekContainer = false;
        this.showTimeContainer = false;
        this.showInputContainer = true;
        break;

      case PickerType.Time:
        this.showDateContainer = false;
        this.showYearContainer = false;
        this.showMonthContainer = false;
        this.showDayContainer = false;
        this.showWeekContainer = false;
        this.showTimeContainer = true;
        this.showInputContainer = false;
        break;

      case PickerType.Year:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = false;
        this.showDayContainer = false;
        this.showWeekContainer = false;
        this.showTimeContainer = false;
        this.showInputContainer = false;
        break;

      case PickerType.Month:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = true;
        this.showDayContainer = false;
        this.showWeekContainer = false;
        this.showTimeContainer = false;
        this.showInputContainer = false;
        break;

      case PickerType.Week:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = true;
        this.showDayContainer = false;
        this.showWeekContainer = true;
        this.showTimeContainer = false;
        this.showInputContainer = true;
        break;

      default:
        this.showDateContainer = true;
        this.showYearContainer = true;
        this.showMonthContainer = true;
        this.showDayContainer = true;
        this.showWeekContainer = true;
        this.showTimeContainer = true;
        this.showInputContainer = true;
        break;
    }
  }
}
