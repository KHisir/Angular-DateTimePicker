import * as moment from 'moment';

export class Year {
  public static getYears() {
    const years: number[] = [];
    const start: number = 1970;
    const end: number = moment().year() + 5;

    for (let i = start; i <= end; i++) {
      years.push(i);
    }

    return years;
  }
  constructor() {}
}
