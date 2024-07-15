import { TestBed } from '@angular/core/testing';

import { ProduitService } from './src/app/services/produit.service';

describe('ProduitService', () => {
  let service: ProduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
