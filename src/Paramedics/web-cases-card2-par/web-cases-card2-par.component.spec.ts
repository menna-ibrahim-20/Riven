import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard2ParComponent } from './web-cases-card2-par.component';

describe('WebCasesCard2ParComponent', () => {
  let component: WebCasesCard2ParComponent;
  let fixture: ComponentFixture<WebCasesCard2ParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard2ParComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard2ParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
