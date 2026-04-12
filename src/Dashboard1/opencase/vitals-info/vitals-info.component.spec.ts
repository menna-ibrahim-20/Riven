import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsInfoComponent } from './vitals-info.component';

describe('VitalsInfoComponent', () => {
  let component: VitalsInfoComponent;
  let fixture: ComponentFixture<VitalsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalsInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
