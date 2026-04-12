import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOut1Component } from './log-out1.component';

describe('LogOut1Component', () => {
  let component: LogOut1Component;
  let fixture: ComponentFixture<LogOut1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogOut1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogOut1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
