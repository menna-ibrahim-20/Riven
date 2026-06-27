import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard7AnalyticsComponent } from './web-cases-card7-analytics.component';

describe('WebCasesCard7AnalyticsComponent', () => {
  let component: WebCasesCard7AnalyticsComponent;
  let fixture: ComponentFixture<WebCasesCard7AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard7AnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard7AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
