import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonelComponent } from './list-personel.component';

describe('ListPersonelComponent', () => {
  let component: ListPersonelComponent;
  let fixture: ComponentFixture<ListPersonelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPersonelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
