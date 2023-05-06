import { TestBed } from '@angular/core/testing';

import { CuisService } from './cuis.service';

describe('CuisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuisService = TestBed.get(CuisService);
    expect(service).toBeTruthy();
  });
});
