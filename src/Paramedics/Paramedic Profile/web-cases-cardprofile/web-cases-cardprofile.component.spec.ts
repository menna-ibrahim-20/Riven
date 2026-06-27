import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCasesCardprofileComponent } from './web-cases-cardprofile.component';

describe('WebCasesCardprofileComponent', () => {
  let component: WebCasesCardprofileComponent;
  let fixture: ComponentFixture<WebCasesCardprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCasesCardprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCasesCardprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
