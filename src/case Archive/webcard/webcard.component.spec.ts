import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcardComponent } from './webcard.component';

describe('WebcardComponent', () => {
  let component: WebcardComponent;
  let fixture: ComponentFixture<WebcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
