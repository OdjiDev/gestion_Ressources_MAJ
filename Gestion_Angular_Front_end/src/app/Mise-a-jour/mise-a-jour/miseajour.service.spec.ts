import { TestBed } from '@angular/core/testing';
import { MiseajourService } from './miseajour.service';


describe('MiseajourService', () => {
  let service: MiseajourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiseajourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
