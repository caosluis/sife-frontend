import { TestBed } from '@angular/core/testing';

import { GestioncufdService } from './gestioncufd.service';

describe('GestioncufdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestioncufdService = TestBed.get(GestioncufdService);
    expect(service).toBeTruthy();
  });
});
