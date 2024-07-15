import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesVerbalReceptionComponent } from './list-proces-verbal-reception.component';

describe('ListProcesVerbalReceptionComponent', () => {
  let component: ListProcesVerbalReceptionComponent;
  let fixture: ComponentFixture<ListProcesVerbalReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProcesVerbalReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProcesVerbalReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
