import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAvarieComponent } from './search-avarie.component';

describe('SearchAvarieComponent', () => {
  let component: SearchAvarieComponent;
  let fixture: ComponentFixture<SearchAvarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAvarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAvarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
