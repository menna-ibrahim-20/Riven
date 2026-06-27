import { Component, ViewEncapsulation, HostBinding, Input, } from "@angular/core";

@Component({
  selector: 'app-vitalcard',
  standalone: true,
  imports: [],
  templateUrl: './vitalcard.component.html',
  styleUrl: './vitalcard.component.css'
})
export class VitalcardComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() num: string = "88 bpm";
  @Input() sTitle: string = "Heart Rate";
  /** Variant props */
  @Input() property1: string | number | undefined = "Normal";
}
