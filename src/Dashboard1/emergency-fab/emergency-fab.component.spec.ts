import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyFabComponent } from './emergency-fab.component';

describe('EmergencyFabComponent', () => {
  let component: EmergencyFabComponent;
  let fixture: ComponentFixture<EmergencyFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergencyFabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmergencyFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
