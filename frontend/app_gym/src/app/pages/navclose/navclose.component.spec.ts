import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcloseComponent } from './navclose.component';

describe('NavcloseComponent', () => {
  let component: NavcloseComponent;
  let fixture: ComponentFixture<NavcloseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavcloseComponent]
    });
    fixture = TestBed.createComponent(NavcloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
