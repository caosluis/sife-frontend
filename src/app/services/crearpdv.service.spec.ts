import { TestBed } from '@angular/core/testing';

import { CrearpdvService } from './crearpdv.service';

describe('CrearpdvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrearpdvService = TestBed.get(CrearpdvService);
    expect(service).toBeTruthy();
  });
});
