import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard4AnalyticsComponent } from './web-cases-card4-analytics.component';

describe('WebCasesCard4AnalyticsComponent', () => {
  let component: WebCasesCard4AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard4AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard4AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard4AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
