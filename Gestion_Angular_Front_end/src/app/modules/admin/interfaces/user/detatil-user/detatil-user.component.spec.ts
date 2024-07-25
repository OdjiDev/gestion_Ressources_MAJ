import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetatilUserComponent } from './detatil-user.component';

describe('DetatilUserComponent', () => {
  let component: DetatilUserComponent;
  let fixture: ComponentFixture<DetatilUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetatilUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetatilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
