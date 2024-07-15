import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSocieteComponent } from './search-societe.component';

describe('SearchSocieteComponent', () => {
  let component: SearchSocieteComponent;
  let fixture: ComponentFixture<SearchSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
