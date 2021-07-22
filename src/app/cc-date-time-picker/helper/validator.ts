import { Moment } from 'moment';

export class DtPickerValidator {
  constructor() {}

  static isNullOrEmpty(param: any): boolean {
    if (param === null || param === undefined) {
      return true;
    }

    if (typeof param === 'string') {
      if (param === '' || param.length <= 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  static isValidDate(dt: Moment): boolean {
    try {
      if (dt.isValid() === true && dt.isSameOrBefore('1970-01-01') === false) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
