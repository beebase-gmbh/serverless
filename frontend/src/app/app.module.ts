import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TextWriterComponent } from './text-writer/text-writer.component';
import { TextWriterDialogComponent } from './text-writer/text-writer-dialog/text-writer-dialog.component';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TextWriterService } from './text-writer/text-writer.service';


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
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    TextWriterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
