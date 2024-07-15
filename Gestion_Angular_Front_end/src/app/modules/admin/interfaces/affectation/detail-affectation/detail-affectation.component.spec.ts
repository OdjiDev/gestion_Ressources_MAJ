import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAffectationComponent } from './detail-affectation.component';

describe('DetailAffectationComponent', () => {
  let component: DetailAffectationComponent;
  let fixture: ComponentFixture<DetailAffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAffectationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
