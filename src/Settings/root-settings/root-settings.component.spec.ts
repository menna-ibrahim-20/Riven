import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootSettingsComponent } from './root-settings.component';

describe('RootSettingsComponent', () => {
  let component: RootSettingsComponent;
  let fixture: ComponentFixture<RootSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
