import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSignalerComponent } from './create-signaler.component';

describe('CreateSignalerComponent', () => {
  let component: CreateSignalerComponent;
  let fixture: ComponentFixture<CreateSignalerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSignalerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSignalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
