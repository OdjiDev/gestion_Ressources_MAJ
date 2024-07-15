import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReparationComponent } from './list-reparation.component';

describe('ListReparationComponent', () => {
  let component: ListReparationComponent;
  let fixture: ComponentFixture<ListReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
