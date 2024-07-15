import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFournisseurComponent } from './search-fournisseur.component';

describe('SearchFournisseurComponent', () => {
  let component: SearchFournisseurComponent;
  let fixture: ComponentFixture<SearchFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFournisseurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
