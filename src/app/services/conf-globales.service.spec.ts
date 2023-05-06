import { TestBed } from '@angular/core/testing';

import { ConfGlobalesService } from './conf-globales.service';

describe('ConfGlobalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfGlobalesService = TestBed.get(ConfGlobalesService);
    expect(service).toBeTruthy();
  });
});
