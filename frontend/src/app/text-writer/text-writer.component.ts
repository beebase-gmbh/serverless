import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { TextWriterDialogComponent } from './text-writer-dialog/text-writer-dialog.component';
import { TextWriterService } from './text-writer.service';
import { IMessage } from './message.interface';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-text-writer',
  templateUrl: './text-writer.component.html',
  styleUrls: ['./text-writer.component.scss']
})
export class TextWriterComponent implements OnInit, OnDestroy {
  @ViewChild('textWriter') textWriter: ElementRef;
  private position: {x: number, y: number};
  private msgPollIntervalId: any;
  private subscription: Subscription = new Subscription();
  private elements: HTMLDivElement[] = [];

  constructor(public dialog: MatDialog,
              private twService: TextWriterService) { }

  ngOnInit() {
    this.msgPollIntervalId = setInterval(() => {
      this.clearPage();
      this.subscription.add(this.twService.getMessages().subscribe((messages: IMessage[]) => {
        if (!messages) {
          return;
        }
        messages.forEach((msg: IMessage) => {
          this.appendMessageToPage(msg);
        });
      }));
    }, 5000);
  }

  ngOnDestroy(): void {
    clearInterval(this.msgPollIntervalId);
    this.subscription.unsubscribe();
  }

  onBackgroundClick(event: MouseEvent): void {
    this.dialog.open(TextWriterDialogComponent)
    .afterClosed()
    .subscribe(result => {
      if (!result) {
        return;
      }

      const msg: IMessage = {
        message: result,
        xPos: 100 / window.innerWidth * event.clientX,
        yPos: 100 / window.innerHeight * event.clientY
      };

      this.subscription.add(this.twService.postMessage(msg).subscribe());
      this.appendMessageToPage(msg);
    });
  }

  private appendMessageToPage(msg: IMessage): void {
    const msgDiv = document.createElement('div');
    msgDiv.innerText = msg.message;
    msgDiv.style.position = 'absolute';
    msgDiv.style.left = msg.xPos + '%';
    msgDiv.style.top = msg.yPos + '%';
    this.elements.push(msgDiv);
    (<HTMLElement>this.textWriter.nativeElement).appendChild(msgDiv);
  }

  private clearPage(): void {
    this.elements.forEach((el: HTMLDivElement) => {
      (<HTMLElement>this.textWriter.nativeElement).removeChild(el);
    });
    this.elements = [];
  }

}
