import { PickerType, MomentFormat } from './enums';

export class FormatManager {
  public static getFormatByPickerType(pickerType: PickerType): MomentFormat {
    switch (pickerType) {
      case PickerType.DateTime:
        return MomentFormat.DateTime;

      case PickerType.Date:
        return MomentFormat.Date;

      case PickerType.Year:
        return MomentFormat.Year;

      case PickerType.Month:
        return MomentFormat.Month;

      case PickerType.Week:
        return MomentFormat.Week;

      case PickerType.Time:
        return MomentFormat.Time;

      default:
        return MomentFormat.DateTime;
    }
  }
  constructor() {}
}
