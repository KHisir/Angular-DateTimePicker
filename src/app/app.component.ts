import { Component } from '@angular/core';
import { SelectMode, PickerType, PickerTriggerType } from './cc-date-time-picker/helper/enums';
import { PickerResult } from './cc-date-time-picker/model/pickerResult';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-datetime-picker';

  from: Date = new Date();
  to: Date = new Date();
  selectMode: SelectMode = SelectMode.Range;
  pickerType: PickerType = PickerType.DateTime;
  pickerTriggerType: PickerTriggerType = PickerTriggerType.Button;
  language: string = 'tr';

  // Playground
  pickerLanguageList: string[] = ['de', 'en', 'en-gb', 'tr', 'it'];
  pickerTriggerTypeList: PickerTriggerType[] = [PickerTriggerType.Button, PickerTriggerType.Link];
  selectModes: SelectMode[] = [SelectMode.Single, SelectMode.Range];
  pickerTypes: PickerType[] = [
    PickerType.DateTime,
    PickerType.Date,
    PickerType.Month,
    PickerType.Year,
    PickerType.Week,
    PickerType.Time,
  ];
  // @end Playground

  onChanged(res: PickerResult) {
    console.log(res);
    // this.from = res.From;
    // this.to = res.To;
  }
}
