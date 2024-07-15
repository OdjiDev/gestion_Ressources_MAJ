import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonelComponent } from './detail-personel.component';

describe('DetailPersonelComponent', () => {
  let component: DetailPersonelComponent;
  let fixture: ComponentFixture<DetailPersonelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPersonelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
