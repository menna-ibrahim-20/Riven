import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard9SettingsComponent } from './web-cases-card9-settings.component';

describe('WebCasesCard9SettingsComponent', () => {
  let component: WebCasesCard9SettingsComponent;
  let fixture: ComponentFixture<WebCasesCard9SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard9SettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard9SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
