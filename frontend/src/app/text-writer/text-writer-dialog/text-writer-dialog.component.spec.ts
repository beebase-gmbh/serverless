import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWriterDialogComponent } from './text-writer-dialog.component';

describe('TextWriterDialogComponent', () => {
  let component: TextWriterDialogComponent;
  let fixture: ComponentFixture<TextWriterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextWriterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextWriterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
