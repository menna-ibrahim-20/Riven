import { Component, ViewEncapsulation, HostBinding,Input,} from "@angular/core";
import { CallconComponent } from "../callcon/callcon.component";

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CallconComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})
export class CallComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() text: string = "Call Ambulance";
  @Input() property11: string | number | undefined = "";
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Action props */
  @Input() onFrameContainerClick: () => void = () => {};
}
