import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard6AnalyticsComponent } from './web-cases-card6-analytics.component';

describe('WebCasesCard6AnalyticsComponent', () => {
  let component: WebCasesCard6AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard6AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard6AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard6AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
