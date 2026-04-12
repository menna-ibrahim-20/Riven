import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamedicComponent } from './paramedic.component';

describe('ParamedicComponent', () => {
  let component: ParamedicComponent;
  let fixture: ComponentFixture<ParamedicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamedicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
