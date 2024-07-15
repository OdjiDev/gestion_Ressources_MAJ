import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvarieComponent } from './update-avarie.component';

describe('UpdateAvarieComponent', () => {
  let component: UpdateAvarieComponent;
  let fixture: ComponentFixture<UpdateAvarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAvarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAvarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
