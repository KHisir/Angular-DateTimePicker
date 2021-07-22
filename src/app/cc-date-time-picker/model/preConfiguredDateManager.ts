import * as moment from 'moment';
import { Moment } from 'moment';

export enum PreConfiguredDateType {
  Today = 0,
  Yesterday = 1,
  LastSevenDays = 2,
  LastThirtyDays = 3,
  LastSixMonth = 4,
  ThisMonth = 5,
  LastMonth = 6,
  ThisYear = 7,
  LastYear = 8,
}

export class PreConfiguredDateResult {
  public From: Moment;
  public To: Moment;

  constructor(from: Moment, to: Moment) {
    this.From = from;
    this.To = to;
  }
}

export class PreConfiguredDate {
  public Type: PreConfiguredDateType;
  public Description: string;

  constructor(type: PreConfiguredDateType, description: string) {
    this.Type = type;
    this.Description = description;
  }

  public onChange(): PreConfiguredDateResult {
    switch (this.Type) {
      case PreConfiguredDateType.Today:
        return this.getToday();
      case PreConfiguredDateType.Yesterday:
        return this.getYesterday();
      case PreConfiguredDateType.LastSevenDays:
        return this.getLastSevenDays();
      case PreConfiguredDateType.LastThirtyDays:
        return this.getLastThirtyDays();
      case PreConfiguredDateType.LastSixMonth:
        return this.getLastSixMonth();
      case PreConfiguredDateType.ThisMonth:
        return this.getThisMonth();
      case PreConfiguredDateType.LastMonth:
        return this.getLastMonth();
      case PreConfiguredDateType.ThisYear:
        return this.getThisYear();
      case PreConfiguredDateType.LastYear:
        return this.getLastYear();
    }
  }

  private getToday(): PreConfiguredDateResult {
    const from = moment().startOf('day');
    const to = moment().endOf('day');
    return new PreConfiguredDateResult(from, to);
  }

  private getYesterday(): PreConfiguredDateResult {
    const from = moment().subtract(1, 'day').startOf('day');
    const to = moment().subtract(1, 'day').endOf('day');
    return new PreConfiguredDateResult(from, to);
  }

  private getLastSevenDays(): PreConfiguredDateResult {
    const to = moment().endOf('day');
    const from = moment().subtract(6, 'day').startOf('day');
    return new PreConfiguredDateResult(from, to);
  }

  private getLastThirtyDays(): PreConfiguredDateResult {
    const to = moment().endOf('day');
    const from = moment().subtract(29, 'day').startOf('day');
    return new PreConfiguredDateResult(from, to);
  }

  private getLastSixMonth(): PreConfiguredDateResult {
    const to = moment().endOf('month');
    const from = moment().subtract(5, 'month').startOf('month');
    return new PreConfiguredDateResult(from, to);
  }

  private getThisMonth(): PreConfiguredDateResult {
    const from = moment().startOf('month');
    const to = moment().endOf('month');
    return new PreConfiguredDateResult(from, to);
  }

  private getLastMonth(): PreConfiguredDateResult {
    const from = moment().subtract(1, 'month').startOf('month');
    const to = moment().subtract(1, 'month').endOf('month');
    return new PreConfiguredDateResult(from, to);
  }

  private getThisYear(): PreConfiguredDateResult {
    const from = moment().startOf('year');
    const to = moment().endOf('year');
    return new PreConfiguredDateResult(from, to);
  }

  private getLastYear(): PreConfiguredDateResult {
    const from = moment().subtract(1, 'year').startOf('year');
    const to = moment().subtract(1, 'year').endOf('year');
    return new PreConfiguredDateResult(from, to);
  }
}

export class PreConfiguredDateSelection {
  private list: PreConfiguredDate[] = [];
  constructor() {
    this.list = [
      new PreConfiguredDate(PreConfiguredDateType.Today, 'Today'),
      new PreConfiguredDate(PreConfiguredDateType.Yesterday, 'Yesterday'),
      new PreConfiguredDate(PreConfiguredDateType.LastSevenDays, 'Last 7 days'),
      new PreConfiguredDate(PreConfiguredDateType.LastThirtyDays, 'Last 30 days'),
      new PreConfiguredDate(PreConfiguredDateType.LastSixMonth, 'Last 6 months'),
      new PreConfiguredDate(PreConfiguredDateType.ThisMonth, 'This month'),
      new PreConfiguredDate(PreConfiguredDateType.LastMonth, 'Last month'),
      new PreConfiguredDate(PreConfiguredDateType.ThisYear, 'This year'),
      new PreConfiguredDate(PreConfiguredDateType.LastYear, 'Last year'),
    ];
  }

  public get List(): PreConfiguredDate[] {
    return this.list;
  }
  public set List(value: PreConfiguredDate[]) {
    this.list = value;
  }
}
