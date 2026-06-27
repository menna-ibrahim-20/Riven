import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebEmergencyActionButtonComponent } from './web-emergency-action-button.component';

describe('WebEmergencyActionButtonComponent', () => {
  let component: WebEmergencyActionButtonComponent;
  let fixture: ComponentFixture<WebEmergencyActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebEmergencyActionButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebEmergencyActionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { WInputFieldsIcon2 } from "../WInputFieldsIcon2/WInputFieldsIcon2.component";
import { FrameComponent111 } from "../FrameComponent111/FrameComponent111.component";
import { WInputFieldsIcon1 } from "../WInputFieldsIcon1/WInputFieldsIcon1.component";
import { WInputFieldsIcon } from "../WInputFieldsIcon/WInputFieldsIcon.component";
import { Direction } from "../Direction/Direction.component";

@Component({
  selector: "web-emergency-action-button1",
  standalone: true,
  imports: [
    WInputFieldsIcon2,
    FrameComponent111,
    WInputFieldsIcon1,
    WInputFieldsIcon,
    Direction,
  ],
  templateUrl: "./WebEmergencyActionButton1.component.html",
  styleUrls: ["./WebEmergencyActionButton1.component.css"],
})
export class WebEmergencyActionButton1 {
  @HostBinding("style.display") display = "contents";
}
