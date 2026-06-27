import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameParComponent } from './frame-par.component';

describe('FrameParComponent', () => {
  let component: FrameParComponent;
  let fixture: ComponentFixture<FrameParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameParComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrameParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
