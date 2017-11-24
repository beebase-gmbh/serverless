import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TextWriterDialogComponent } from './text-writer-dialog/text-writer-dialog.component';

@Component({
  selector: 'app-text-writer',
  templateUrl: './text-writer.component.html',
  styleUrls: ['./text-writer.component.scss']
})
export class TextWriterComponent implements OnInit {
  @ViewChild('textWriter') textWriter: ElementRef;
  private position: {x: number, y: number};

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onBackgroundClick(event: MouseEvent): void {
    this.position = {
      x: event.clientX,
      y: event.clientY
    };

    this.dialog.open(TextWriterDialogComponent)
    .afterClosed()
    .subscribe(result => {
      if (!result) {
        return;
      }

      this.appendMessageToPage(result);
    });
  }

  private appendMessageToPage(message: string): void {
    const msgDiv = document.createElement('div');
    msgDiv.innerText = message;
    msgDiv.style.position = 'absolute';
    msgDiv.style.left = this.position.x.toString() + 'px';
    msgDiv.style.top = this.position.y.toString() + 'px';
    this.textWriter.nativeElement.appendChild(msgDiv);
  }

}
