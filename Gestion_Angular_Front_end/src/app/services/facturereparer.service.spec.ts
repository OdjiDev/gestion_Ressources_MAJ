import { TestBed } from '@angular/core/testing';

import { FacturereparerService } from './facturereparer.service';

describe('FacturereparerService', () => {
  let service: FacturereparerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturereparerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
