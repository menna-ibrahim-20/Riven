import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WInputFieldsIcon4SettingsComponent } from './winput-fields-icon4-settings.component';

describe('WInputFieldsIcon4SettingsComponent', () => {
  let component: WInputFieldsIcon4SettingsComponent;
  let fixture: ComponentFixture<WInputFieldsIcon4SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WInputFieldsIcon4SettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WInputFieldsIcon4SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
