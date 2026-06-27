import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamedicColumnComponent } from './paramedic-column.component';

describe('ParamedicColumnComponent', () => {
  let component: ParamedicColumnComponent;
  let fixture: ComponentFixture<ParamedicColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamedicColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParamedicColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
