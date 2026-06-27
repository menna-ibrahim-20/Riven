import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcasescardComponent } from './webcasescard.component';

describe('WebcasescardComponent', () => {
  let component: WebcasescardComponent;
  let fixture: ComponentFixture<WebcasescardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcasescardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebcasescardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
