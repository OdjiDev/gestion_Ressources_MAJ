import { TestBed } from '@angular/core/testing';

import { ReparerService } from './reparer.service';

describe('ReparerService', () => {
  let service: ReparerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReparerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
