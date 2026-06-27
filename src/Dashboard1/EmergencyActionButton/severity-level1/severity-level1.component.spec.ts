import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityLevel1Component } from './severity-level1.component';

describe('SeverityLevel1Component', () => {
  let component: SeverityLevel1Component;
  let fixture: ComponentFixture<SeverityLevel1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeverityLevel1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeverityLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
