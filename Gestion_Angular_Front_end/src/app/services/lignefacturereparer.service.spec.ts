import { TestBed } from '@angular/core/testing';

import { LignefacturereparerService } from './lignefacturereparer.service';

describe('LignefacturereparerService', () => {
  let service: LignefacturereparerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignefacturereparerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
