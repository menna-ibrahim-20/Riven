import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerowStackComponent } from './tablerow-stack.component';

describe('TablerowStackComponent', () => {
  let component: TablerowStackComponent;
  let fixture: ComponentFixture<TablerowStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablerowStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablerowStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
