import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCardAddComponent } from './web-cases-card-add.component';

describe('WebCasesCardAddComponent', () => {
  let component: WebCasesCardAddComponent;
  let fixture: ComponentFixture<WebCasesCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCardAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
