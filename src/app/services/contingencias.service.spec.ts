import { TestBed } from '@angular/core/testing';

import { ContingenciasService } from './contingencias.service';

describe('ContingenciasService', () => {
  let service: ContingenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContingenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
