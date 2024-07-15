import { TestBed } from '@angular/core/testing';
import { LigneFactureService } from './ligneFacture.service';





describe('LignefactureService', () => {
  let service: LigneFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LigneFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
