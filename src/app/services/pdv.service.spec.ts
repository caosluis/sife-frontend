import { TestBed } from '@angular/core/testing';

import { PdvService } from './pdv.service';

describe('PdvService', () => {
  let service: PdvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
