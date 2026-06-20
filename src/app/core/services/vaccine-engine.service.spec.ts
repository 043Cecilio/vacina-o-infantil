import { TestBed } from '@angular/core/testing';

import { VaccineEngine } from './vaccine-engine.service';

describe('VaccineEngine', () => {
  let service: VaccineEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineEngine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
