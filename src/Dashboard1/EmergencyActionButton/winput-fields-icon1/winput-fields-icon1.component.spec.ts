import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WInputFieldsIcon1Component } from './winput-fields-icon1.component';

describe('WInputFieldsIcon1Component', () => {
  let component: WInputFieldsIcon1Component;
  let fixture: ComponentFixture<WInputFieldsIcon1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WInputFieldsIcon1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WInputFieldsIcon1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
