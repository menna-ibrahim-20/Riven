import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalcardComponent } from './vitalcard.component';

describe('VitalcardComponent', () => {
  let component: VitalcardComponent;
  let fixture: ComponentFixture<VitalcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
