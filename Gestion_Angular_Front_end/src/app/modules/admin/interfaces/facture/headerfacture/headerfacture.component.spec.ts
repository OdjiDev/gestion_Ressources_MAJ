import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderfactureComponent } from './headerfacture.component';

describe('HeaderfactureComponent', () => {
  let component: HeaderfactureComponent;
  let fixture: ComponentFixture<HeaderfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderfactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
