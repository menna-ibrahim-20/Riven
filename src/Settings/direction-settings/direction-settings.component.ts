import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-direction-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './direction-settings.component.html',
  styleUrl: './direction-settings.component.css'
})
export class DirectionSettingsComponent {
  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() text: string = "Send Emergency Broadcast";
  @Input() direction: string = "";
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Style props */
  @Input() directionBackgroundColor: string | number | undefined = "";

  get directionStyle() {
    return {
      "background-color": this.directionBackgroundColor,
    };
  }
}
