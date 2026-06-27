import {
  Component,
  ViewEncapsulation,
  HostBinding,
  Input,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { CallconComponent } from "../../callcon/callcon.component";

@Component({
  selector: 'app-map-call',
  standalone: true,
  imports: [CommonModule, CallconComponent],
  templateUrl: './map-call.component.html',
  styleUrl: './map-call.component.css'
})
export class MapCallComponent {


  @HostBinding("style.display") display = "contents";

  @Input() text: string = "Call Ambulance";
  @Input() property11: string | number | undefined = "";
  @Input() property1: string | number | undefined = "Default";
  @Input() callWidth: string | number | undefined = "";
  @Input() callAlignSelf: string | number | undefined = "";

  get callStyle() {
    return {
      width: this.callWidth,
      "align-self": this.callAlignSelf,
    };
  }

  onCallAmbulance(): void {
    window.location.href = 'tel:123';
  }
}
