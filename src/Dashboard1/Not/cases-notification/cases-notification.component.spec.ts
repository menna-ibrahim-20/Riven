import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesNotificationComponent } from './cases-notification.component';

describe('CasesNotificationComponent', () => {
  let component: CasesNotificationComponent;
  let fixture: ComponentFixture<CasesNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
