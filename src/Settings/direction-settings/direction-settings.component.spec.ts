import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectionSettingsComponent } from './direction-settings.component';

describe('DirectionSettingsComponent', () => {
  let component: DirectionSettingsComponent;
  let fixture: ComponentFixture<DirectionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectionSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirectionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
