import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCasesprofileComponent } from './time-casesprofile.component';

describe('TimeCasesprofileComponent', () => {
  let component: TimeCasesprofileComponent;
  let fixture: ComponentFixture<TimeCasesprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeCasesprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeCasesprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
