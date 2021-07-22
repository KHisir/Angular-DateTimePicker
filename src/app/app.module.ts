import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CcDateTimePickerComponent } from './cc-date-time-picker/cc-date-time-picker.component';
import { EditorComponent } from './cc-date-time-picker/editor/editor.component';
import { TimestampTextComponent } from './cc-date-time-picker/timestamp-text/timestamp-text.component';

@NgModule({
  declarations: [	
    AppComponent,
    CcDateTimePickerComponent,
    EditorComponent,
    TimestampTextComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
