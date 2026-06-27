import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Direction1profileComponent } from './direction1profile.component';

describe('Direction1profileComponent', () => {
  let component: Direction1profileComponent;
  let fixture: ComponentFixture<Direction1profileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Direction1profileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Direction1profileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
