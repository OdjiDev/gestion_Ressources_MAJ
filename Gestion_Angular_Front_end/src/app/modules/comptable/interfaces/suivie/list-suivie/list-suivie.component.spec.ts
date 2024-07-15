import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuivieComponent } from './list-suivie.component';

describe('ListSuivieComponent', () => {
  let component: ListSuivieComponent;
  let fixture: ComponentFixture<ListSuivieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSuivieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSuivieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
