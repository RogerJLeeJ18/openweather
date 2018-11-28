import { TestBed } from '@angular/core/testing';

import { ForecasterService } from './forecaster.service';

describe('ForecasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecasterService = TestBed.get(ForecasterService);
    expect(service).toBeTruthy();
  });
});
