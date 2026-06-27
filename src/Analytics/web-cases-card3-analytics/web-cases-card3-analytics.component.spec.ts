import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard3AnalyticsComponent } from './web-cases-card3-analytics.component';

describe('WebCasesCard3AnalyticsComponent', () => {
  let component: WebCasesCard3AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard3AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard3AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard3AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
