import { TestBed } from '@angular/core/testing';

import { CufdHistorico.Service.TsService } from './cufd-historico.service.ts.service';

describe('CufdHistorico.Service.TsService', () => {
  let service: CufdHistorico.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CufdHistorico.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
