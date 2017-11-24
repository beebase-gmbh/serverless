import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-text-writer-dialog',
  templateUrl: './text-writer-dialog.component.html',
  styleUrls: ['./text-writer-dialog.component.scss']
})
export class TextWriterDialogComponent implements OnInit {
  message: string;

  constructor(public dialogRef: MatDialogRef<TextWriterDialogComponent>) {}

  ngOnInit() {
  }

  onOkClick(message: string): void {
    this.dialogRef.close(message);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
