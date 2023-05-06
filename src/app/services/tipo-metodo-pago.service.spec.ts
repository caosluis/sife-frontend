import { TestBed } from '@angular/core/testing';

import { TipoMetodoPagoService } from './tipo-metodo-pago.service';

describe('TipoMetodoPagoService', () => {
  let service: TipoMetodoPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMetodoPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
