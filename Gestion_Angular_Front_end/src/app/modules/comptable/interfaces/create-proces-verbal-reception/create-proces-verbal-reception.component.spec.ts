import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcesVerbalReceptionComponent } from './create-proces-verbal-reception.component';

describe('CreateProcesVerbalReceptionComponent', () => {
  let component: CreateProcesVerbalReceptionComponent;
  let fixture: ComponentFixture<CreateProcesVerbalReceptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProcesVerbalReceptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProcesVerbalReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
