import { TestBed } from '@angular/core/testing';

import { LeyendasFacturaService } from './leyendas-factura.service';

describe('LeyendasFacturaService', () => {
  let service: LeyendasFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeyendasFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
