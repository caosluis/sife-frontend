import { TestBed } from '@angular/core/testing';

import { QrdireccionService } from './qrdireccion.service';

describe('QrdireccionService', () => {
  let service: QrdireccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrdireccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
