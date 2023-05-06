import { TestBed } from '@angular/core/testing';

import { SelectorcuisService } from './selectorcuis.service';

describe('SelectorcuisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SelectorcuisService = TestBed.get(SelectorcuisService);
    expect(service).toBeTruthy();
  });
});
