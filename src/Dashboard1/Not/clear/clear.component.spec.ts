import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearComponent } from './clear.component';

describe('ClearComponent', () => {
  let component: ClearComponent;
  let fixture: ComponentFixture<ClearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";

@Component({
  selector: "clear",
  standalone: true,
  imports: [],
  templateUrl: "./Clear.component.html",
  styleUrls: ["./Clear.component.css"],
})
export class Clear {
  @HostBinding("style.display") display = "contents";

  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
}
