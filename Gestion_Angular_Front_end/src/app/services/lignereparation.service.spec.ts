import { TestBed } from '@angular/core/testing';

import { LignereparationService } from './lignereparation.service';

describe('LignereparationService', () => {
  let service: LignereparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LignereparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
