import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseDetilsViewComponent } from './case-detils-view.component';

describe('CaseDetilsViewComponent', () => {
  let component: CaseDetilsViewComponent;
  let fixture: ComponentFixture<CaseDetilsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseDetilsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseDetilsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
