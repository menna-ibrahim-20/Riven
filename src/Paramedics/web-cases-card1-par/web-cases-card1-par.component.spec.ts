import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCard1ParComponent } from './web-cases-card1-par.component';

describe('WebCasesCard1ParComponent', () => {
  let component: WebCasesCard1ParComponent;
  let fixture: ComponentFixture<WebCasesCard1ParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCard1ParComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCard1ParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
