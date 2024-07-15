import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReparationComponent } from './update-reparation.component';

describe('UpdateReparationComponent', () => {
  let component: UpdateReparationComponent;
  let fixture: ComponentFixture<UpdateReparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
