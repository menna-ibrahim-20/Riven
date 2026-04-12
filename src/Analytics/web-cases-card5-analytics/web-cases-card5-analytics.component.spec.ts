import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard5AnalyticsComponent } from './web-cases-card5-analytics.component';

describe('WebCasesCard5AnalyticsComponent', () => {
  let component: WebCasesCard5AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard5AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard5AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard5AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
