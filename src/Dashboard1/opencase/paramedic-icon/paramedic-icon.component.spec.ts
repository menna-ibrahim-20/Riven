import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamedicIconComponent } from './paramedic-icon.component';

describe('ParamedicIconComponent', () => {
  let component: ParamedicIconComponent;
  let fixture: ComponentFixture<ParamedicIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamedicIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamedicIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
