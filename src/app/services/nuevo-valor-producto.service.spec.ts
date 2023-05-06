import { TestBed } from '@angular/core/testing';

import { NuevoValorProductoService } from './nuevo-valor-producto.service';

describe('NuevoValorProductoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NuevoValorProductoService = TestBed.get(NuevoValorProductoService);
    expect(service).toBeTruthy();
  });
});
