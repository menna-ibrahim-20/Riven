import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCardParComponent } from './web-card-par.component';

describe('WebCardParComponent', () => {
  let component: WebCardParComponent;
  let fixture: ComponentFixture<WebCardParComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCardParComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCardParComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
