import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSignalerComponent } from './list-signaler.component';

describe('ListSignalerComponent', () => {
  let component: ListSignalerComponent;
  let fixture: ComponentFixture<ListSignalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSignalerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSignalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
