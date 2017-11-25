import { TestBed, inject } from '@angular/core/testing';

import { TextWriterService } from './text-writer.service';

describe('TextWriterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextWriterService]
    });
  });

  it('should be created', inject([TextWriterService], (service: TextWriterService) => {
    expect(service).toBeTruthy();
  }));
});
