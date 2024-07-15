import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrdreMouvementComponent } from './create-ordre-mouvement.component';

describe('CreateOrdreMouvementComponent', () => {
  let component: CreateOrdreMouvementComponent;
  let fixture: ComponentFixture<CreateOrdreMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrdreMouvementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrdreMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
