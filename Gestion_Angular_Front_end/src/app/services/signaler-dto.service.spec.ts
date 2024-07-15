import { TestBed } from '@angular/core/testing';

import { SignalerService } from './signaler-dto.service';

describe('SignalerDtoService', () => {
  let service: SignalerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
