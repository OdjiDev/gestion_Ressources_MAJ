import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSuivieComponent } from './create-suivie.component';

describe('CreateSuivieComponent', () => {
  let component: CreateSuivieComponent;
  let fixture: ComponentFixture<CreateSuivieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSuivieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSuivieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
