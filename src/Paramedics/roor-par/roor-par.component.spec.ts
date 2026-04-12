import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoorParComponent } from './roor-par.component';

describe('RoorParComponent', () => {
  let component: RoorParComponent;
  let fixture: ComponentFixture<RoorParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoorParComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoorParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
