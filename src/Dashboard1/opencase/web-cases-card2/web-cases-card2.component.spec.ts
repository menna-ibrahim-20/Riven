import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard2Component } from './web-cases-card2.component';

describe('WebCasesCard2Component', () => {
  let component: WebCasesCard2Component;
  let fixture: ComponentFixture<WebCasesCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
