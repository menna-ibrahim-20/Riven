import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FramComponent } from './fram.component';

describe('FramComponent', () => {
  let component: FramComponent;
  let fixture: ComponentFixture<FramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
