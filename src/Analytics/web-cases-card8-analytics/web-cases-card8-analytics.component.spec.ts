import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard8AnalyticsComponent } from './web-cases-card8-analytics.component';

describe('WebCasesCard8AnalyticsComponent', () => {
  let component: WebCasesCard8AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard8AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard8AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard8AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
