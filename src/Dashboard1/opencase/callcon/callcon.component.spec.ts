import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallconComponent } from './callcon.component';

describe('CallconComponent', () => {
  let component: CallconComponent;
  let fixture: ComponentFixture<CallconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
