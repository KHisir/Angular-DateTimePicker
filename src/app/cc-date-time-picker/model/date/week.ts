import * as moment from 'moment';
import { Moment } from 'moment';

export class Week {
  public WeekNr: number;
  public Start: Moment;
  public End: Moment;
  public DisplayText: string;

  public static getWeeksInMonth(dt: Moment): Week[] {
    const startOfWeek: Moment = moment(dt.toDate()).startOf('month').startOf('isoWeek');
    const endOfWeek: Moment = moment(dt.toDate()).endOf('month').endOf('isoWeek');

    const days: Moment[] = [];
    let day: Moment = startOfWeek;

    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }

    // console.log(days);

    const weeks: Week[] = [];
    for (let i = 0; i < days.length; i++) {
      const weekNr: number = moment(days[i]).isoWeek();
      const start = days[i];
      const newIndex = i + 6;
      const to = days[newIndex];

      weeks.push(new Week(weekNr, start, to));
      i = newIndex;
    }

    // console.log(weeks);
    return weeks;
  }

  constructor(weekNr: number, start: Moment, end: Moment) {
    this.WeekNr = weekNr;
    this.Start = start;
    this.End = end;
    this.DisplayText =
      '(' +
      this.WeekNr +
      ') ' +
      this.Start.format('L') +
      ' - ' +
      this.End.format('L');
  }
}
