import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeparComponent } from './eyepar.component';

describe('EyeparComponent', () => {
  let component: EyeparComponent;
  let fixture: ComponentFixture<EyeparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeparComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EyeparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
