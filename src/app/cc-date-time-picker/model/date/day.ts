import * as moment from 'moment';

export class Day {
  public Number: number;
  public Name: string;
  public ShortName: string;
  public IsWeekend: boolean = false;

  public static getDaysInMonth(year: number, monthNum: number) {
    const daysInMonth: Day[] = [];

    // Note: Months are zero indexed, so January is month 0
    const dayCountInMonth: number = moment(year + '-' + (monthNum + 1), 'YYYY-MM').daysInMonth();

    for (let dayNum = 0; dayNum < dayCountInMonth; dayNum++) {
      daysInMonth.push(new Day((dayNum + 1), year, monthNum));
    }

    return daysInMonth;
  }

  constructor(dayNum: number, year: number, monthNum: number) {
    this.Number = dayNum;
    this.Name = this.getDayName(dayNum, year, monthNum);
    this.ShortName = this.getDayShortName(dayNum, year, monthNum);

    const dt = moment(year + '-' + (monthNum + 1) + '-' + dayNum, 'YYYY-MM-DD');
    this.IsWeekend = (dt.toDate().getDay() === 6 || dt.toDate().getDay() === 0) ? true : false;
  }

  getDayName(dayNum: number, year: number, monthNum: number): string {
      return moment(year + '-' + (monthNum + 1) + '-' + dayNum, 'YYYY-MM-DD').format('dddd');
  }

  getDayShortName(dayNum: number, year: number, monthNum: number): string {
    return moment(year + '-' + (monthNum + 1) + '-' + dayNum, 'YYYY-MM-DD').format('ddd');
  }
}
