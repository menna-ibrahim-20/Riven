import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Root2Component } from './root2.component';

describe('Root2Component', () => {
  let component: Root2Component;
  let fixture: ComponentFixture<Root2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Root2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Root2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
