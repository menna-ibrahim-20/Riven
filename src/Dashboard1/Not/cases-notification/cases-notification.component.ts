import { Component, ViewEncapsulation, HostBinding, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cases-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases-notification.component.html',
  styleUrl: './cases-notification.component.css'
})
export class CasesNotificationComponent {

@HostBinding("style.display") display = "block";

  @Input() profile: string = "";
  @Input() accepted: string = "";
  @Input() paramedicName: string = "Sarah Chen";
  @Input() paramedicId: string = "PM-001";
  @Input() status: string = "online";
  @Input() caseId: string = "A-2847";
  @Input() ambulance: string = "AMB-045";

  @Input() frameButtonBorder: string | number | undefined = "";
  @Input() frameButtonBackgroundColor: string | number | undefined = "";
  @Input() frameButtonMinWidth: string | number | undefined = "";
  @Input() acceptedColor: string | number | undefined = "";

  get frameButtonStyle() {
    return {
      border: this.frameButtonBorder,
      "background-color": this.frameButtonBackgroundColor,
      "min-width": this.frameButtonMinWidth,
    };
  }

  get acceptedStyle() {
    return {
      color: this.acceptedColor,
    };
  }
}