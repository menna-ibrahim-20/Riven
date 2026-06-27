import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WInputFieldsIcon2Component } from './winput-fields-icon2.component';

describe('WInputFieldsIcon2Component', () => {
  let component: WInputFieldsIcon2Component;
  let fixture: ComponentFixture<WInputFieldsIcon2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WInputFieldsIcon2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WInputFieldsIcon2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
