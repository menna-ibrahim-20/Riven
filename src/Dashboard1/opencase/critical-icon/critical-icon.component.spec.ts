import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticalIconComponent } from './critical-icon.component';

describe('CriticalIconComponent', () => {
  let component: CriticalIconComponent;
  let fixture: ComponentFixture<CriticalIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriticalIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriticalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
