import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCardAnalyticsComponent } from './web-card-analytics.component';

describe('WebCardAnalyticsComponent', () => {
  let component: WebCardAnalyticsComponent;
  let fixture: ComponentFixture<WebCardAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCardAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCardAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
