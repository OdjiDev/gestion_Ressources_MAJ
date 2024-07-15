import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptableDashboardComponent } from './comptable-dashboard.component';

describe('ComptableDashboardComponent', () => {
  let component: ComptableDashboardComponent;
  let fixture: ComponentFixture<ComptableDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptableDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptableDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
