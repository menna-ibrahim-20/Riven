import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionIconComponent } from './direction-icon.component';

describe('DirectionIconComponent', () => {
  let component: DirectionIconComponent;
  let fixture: ComponentFixture<DirectionIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectionIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
