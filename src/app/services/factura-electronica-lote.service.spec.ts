import { TestBed } from '@angular/core/testing';

import { FacturaElectronicaLoteService } from './factura-electronica-lote.service';

describe('FacturaElectronicaLoteService', () => {
  let service: FacturaElectronicaLoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaElectronicaLoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
