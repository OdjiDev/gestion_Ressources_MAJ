import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAvarieComponent } from './list-avarie.component';

describe('ListAvarieComponent', () => {
  let component: ListAvarieComponent;
  let fixture: ComponentFixture<ListAvarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAvarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAvarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
