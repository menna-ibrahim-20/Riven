import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtIconComponent } from './ct-icon.component';

describe('CtIconComponent', () => {
  let component: CtIconComponent;
  let fixture: ComponentFixture<CtIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CtIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
