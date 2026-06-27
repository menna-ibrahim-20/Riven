import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopitalIconComponent } from './hopital-icon.component';

describe('HopitalIconComponent', () => {
  let component: HopitalIconComponent;
  let fixture: ComponentFixture<HopitalIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HopitalIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HopitalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
