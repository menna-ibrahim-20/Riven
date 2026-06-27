import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Profile1AddComponent } from './profile1-add.component';

describe('Profile1AddComponent', () => {
  let component: Profile1AddComponent;
  let fixture: ComponentFixture<Profile1AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile1AddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Profile1AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
