import { TestBed } from '@angular/core/testing';

import { SifeAutenticacionService } from './sife-autenticacion.service';

describe('SifeAutenticacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SifeAutenticacionService = TestBed.get(SifeAutenticacionService);
    expect(service).toBeTruthy();
  });
});
