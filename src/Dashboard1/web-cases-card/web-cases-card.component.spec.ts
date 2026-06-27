import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCardComponent } from './web-cases-card.component';

describe('WebCasesCardComponent', () => {
  let component: WebCasesCardComponent;
  let fixture: ComponentFixture<WebCasesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
