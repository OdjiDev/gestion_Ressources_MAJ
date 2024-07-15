import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvarieComponent } from './create-avarie.component';

describe('CreateAvarieComponent', () => {
  let component: CreateAvarieComponent;
  let fixture: ComponentFixture<CreateAvarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAvarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAvarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
