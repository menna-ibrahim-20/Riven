import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCardCATComponent } from './web-card-cat.component';

describe('WebCardCATComponent', () => {
  let component: WebCardCATComponent;
  let fixture: ComponentFixture<WebCardCATComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCardCATComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCardCATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
