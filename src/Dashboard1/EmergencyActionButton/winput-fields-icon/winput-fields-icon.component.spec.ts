import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WInputFieldsIconComponent } from './winput-fields-icon.component';

describe('WInputFieldsIconComponent', () => {
  let component: WInputFieldsIconComponent;
  let fixture: ComponentFixture<WInputFieldsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WInputFieldsIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WInputFieldsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
