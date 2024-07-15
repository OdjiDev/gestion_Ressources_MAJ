import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdreMouvementComponent } from './list-ordre-mouvement.component';

describe('ListOrdreMouvementComponent', () => {
  let component: ListOrdreMouvementComponent;
  let fixture: ComponentFixture<ListOrdreMouvementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdreMouvementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdreMouvementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
