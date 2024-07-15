import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSignalerComponent } from './update-signaler.component';

describe('UpdateSignalerComponent', () => {
  let component: UpdateSignalerComponent;
  let fixture: ComponentFixture<UpdateSignalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSignalerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSignalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
