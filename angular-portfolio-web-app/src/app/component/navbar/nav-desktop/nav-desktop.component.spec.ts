import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDesktopComponent } from './nav-desktop.component';

describe('NavDesktopComponent', () => {
  let component: NavDesktopComponent;
  let fixture: ComponentFixture<NavDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDesktopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
