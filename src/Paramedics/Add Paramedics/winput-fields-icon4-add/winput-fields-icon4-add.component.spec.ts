import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WInputFieldsIcon4AddComponent } from './winput-fields-icon4-add.component';

describe('WInputFieldsIcon4AddComponent', () => {
  let component: WInputFieldsIcon4AddComponent;
  let fixture: ComponentFixture<WInputFieldsIcon4AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WInputFieldsIcon4AddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WInputFieldsIcon4AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
