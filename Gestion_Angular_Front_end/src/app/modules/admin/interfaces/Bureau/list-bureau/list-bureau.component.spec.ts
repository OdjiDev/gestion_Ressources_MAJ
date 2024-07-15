import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBureauComponent } from './list-bureau.component';

describe('ListBureauComponent', () => {
  let component: ListBureauComponent;
  let fixture: ComponentFixture<ListBureauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBureauComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
