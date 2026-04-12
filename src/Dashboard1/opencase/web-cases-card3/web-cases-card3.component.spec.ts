import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard3Component } from './web-cases-card3.component';

describe('WebCasesCard3Component', () => {
  let component: WebCasesCard3Component;
  let fixture: ComponentFixture<WebCasesCard3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
