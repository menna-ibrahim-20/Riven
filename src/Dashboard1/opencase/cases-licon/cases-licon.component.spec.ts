import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesLIconComponent } from './cases-licon.component';

describe('CasesLIconComponent', () => {
  let component: CasesLIconComponent;
  let fixture: ComponentFixture<CasesLIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasesLIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CasesLIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
