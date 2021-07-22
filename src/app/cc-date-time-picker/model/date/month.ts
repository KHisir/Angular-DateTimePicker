import * as moment from 'moment';

export class Month {
  public Number: number;
  public Name: string;

  public static getMonthsInYear() {
    const momentMonths: string[] = moment.months();
    const monthsInYear: Month[] = [];

    // Note: Months are zero indexed, so January is month 0

    for (let i = 0; i < momentMonths.length; i++) {
      monthsInYear.push(new Month(i, momentMonths[i]));
    }

    return monthsInYear;
  }

  constructor(monthNum: number, name: string) {
    this.Number = monthNum;
    this.Name = name;
  }
}
