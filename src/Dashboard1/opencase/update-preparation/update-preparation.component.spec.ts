import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreparationComponent } from './update-preparation.component';

describe('UpdatePreparationComponent', () => {
  let component: UpdatePreparationComponent;
  let fixture: ComponentFixture<UpdatePreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePreparationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
