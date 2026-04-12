import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotBellComponent } from './not-bell.component';

describe('NotBellComponent', () => {
  let component: NotBellComponent;
  let fixture: ComponentFixture<NotBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotBellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
