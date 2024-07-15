import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBureauComponent } from './create-bureau.component';

describe('CreateBureauComponent', () => {
  let component: CreateBureauComponent;
  let fixture: ComponentFixture<CreateBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBureauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
