import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-arrow-back',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arrow-back.component.html',
  styleUrl: './arrow-back.component.css'
})
export class ArrowBackComponent {
  @HostBinding("style.display") display = "contents";

  @Input() property1: string | number | undefined = "Default";
  @Input() arrowBackTransform: string | number | undefined = "";
  @Input() arrowBackOpacity: string | number | undefined = "";
  @Input() arrowBackIconTransform: string | number | undefined = "";

  get arrowBackStyle() {
    return {
      transform: this.arrowBackTransform,
      opacity: this.arrowBackOpacity,
    };
  }

  get arrowBackIconStyle() {
    return {
      transform: this.arrowBackIconTransform,
    };
  }
}