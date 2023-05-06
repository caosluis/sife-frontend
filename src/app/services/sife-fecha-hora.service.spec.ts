import { TestBed } from '@angular/core/testing';

import { SifeFechaHoraService } from './sife-fecha-hora.service';

describe('SifeFechaHoraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SifeFechaHoraService = TestBed.get(SifeFechaHoraService);
    expect(service).toBeTruthy();
  });
});
