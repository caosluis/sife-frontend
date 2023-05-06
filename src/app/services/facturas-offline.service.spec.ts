import { TestBed } from '@angular/core/testing';

import { FacturasOfflineService } from './facturas-offline.service';

describe('FacturasOfflineService', () => {
  let service: FacturasOfflineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturasOfflineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
