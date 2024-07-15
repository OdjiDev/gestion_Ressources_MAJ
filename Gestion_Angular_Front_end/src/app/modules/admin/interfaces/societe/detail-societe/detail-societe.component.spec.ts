import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSocieteComponent } from './detail-societe.component';

describe('DetailSocieteComponent', () => {
  let component: DetailSocieteComponent;
  let fixture: ComponentFixture<DetailSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSocieteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
