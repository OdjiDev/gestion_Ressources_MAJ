import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAvarieComponent } from './detail-avarie.component';

describe('DetailAvarieComponent', () => {
  let component: DetailAvarieComponent;
  let fixture: ComponentFixture<DetailAvarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAvarieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAvarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
