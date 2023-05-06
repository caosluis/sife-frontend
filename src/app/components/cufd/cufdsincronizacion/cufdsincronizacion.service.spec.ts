import { TestBed } from '@angular/core/testing';

import { CufdsincronizacionService } from './cufdsincronizacion.service';

describe('CufdsincronizacionService', () => {
  let service: CufdsincronizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CufdsincronizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
