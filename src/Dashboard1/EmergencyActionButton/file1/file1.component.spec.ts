import { ComponentFixture, TestBed } from '@angular/core/testing';

import { File1Component } from './file1.component';

describe('File1Component', () => {
  let component: File1Component;
  let fixture: ComponentFixture<File1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [File1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(File1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
