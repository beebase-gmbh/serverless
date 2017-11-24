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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
