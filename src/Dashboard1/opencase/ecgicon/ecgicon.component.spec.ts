import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ECGIconComponent } from './ecgicon.component';

describe('ECGIconComponent', () => {
  let component: ECGIconComponent;
  let fixture: ComponentFixture<ECGIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ECGIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ECGIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
