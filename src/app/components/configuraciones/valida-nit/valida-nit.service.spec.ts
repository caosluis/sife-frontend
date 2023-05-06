import { TestBed } from '@angular/core/testing';

import { ValidaNitService } from './valida-nit.service';

describe('ValidaNitService', () => {
  let service: ValidaNitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidaNitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
