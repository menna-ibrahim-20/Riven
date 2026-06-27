import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RootAnalyticsComponent } from './root-analytics.component';

describe('RootAnalyticsComponent', () => {
  let component: RootAnalyticsComponent;
  let fixture: ComponentFixture<RootAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RootAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
