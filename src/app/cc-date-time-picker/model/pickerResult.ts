import { Moment } from 'moment';

export class PickerResult {
  public From: Date;
  public To: Date;

  public MomentFrom: Moment;
  public MomentTo: Moment;

  constructor(from: Moment, to: Moment) {
    this.From = from.toDate();
    this.To = to.toDate();

    this.MomentFrom = from;
    this.MomentTo = to;
  }
}
