import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard10SettingsComponent } from './web-cases-card10-settings.component';

describe('WebCasesCard10SettingsComponent', () => {
  let component: WebCasesCard10SettingsComponent;
  let fixture: ComponentFixture<WebCasesCard10SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard10SettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard10SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
