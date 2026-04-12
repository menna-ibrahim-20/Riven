import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCallComponent } from './map-call.component';

describe('MapCallComponent', () => {
  let component: MapCallComponent;
  let fixture: ComponentFixture<MapCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
