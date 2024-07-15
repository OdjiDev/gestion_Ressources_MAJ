import { TestBed } from '@angular/core/testing';

import { PersonelService } from './personel.service';

describe('PersonelsService', () => {
  let service: PersonelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
