import { TestBed } from '@angular/core/testing';

import { EventosSignificativosService } from './eventos-significativos.service';

describe('EventosSignificativosService', () => {
  let service: EventosSignificativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventosSignificativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
