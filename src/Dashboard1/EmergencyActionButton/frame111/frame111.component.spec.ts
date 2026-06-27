import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame111Component } from './frame111.component';

describe('Frame111Component', () => {
  let component: Frame111Component;
  let fixture: ComponentFixture<Frame111Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frame111Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Frame111Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
