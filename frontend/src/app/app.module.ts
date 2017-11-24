import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TextWriterComponent } from './text-writer/text-writer.component';
import { TextWriterDialogComponent } from './text-writer/text-writer-dialog/text-writer-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    TextWriterComponent,
    TextWriterDialogComponent
  ],
  entryComponents: [
    TextWriterDialogComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
