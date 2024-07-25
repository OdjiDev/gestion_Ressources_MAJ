import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CresteRoleComponent } from './creste-role.component';

describe('CresteRoleComponent', () => {
  let component: CresteRoleComponent;
  let fixture: ComponentFixture<CresteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CresteRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CresteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
