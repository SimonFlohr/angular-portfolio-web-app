import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreekStatueComponent } from './greek-statue.component';

describe('GreekStatueComponent', () => {
  let component: GreekStatueComponent;
  let fixture: ComponentFixture<GreekStatueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreekStatueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreekStatueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
