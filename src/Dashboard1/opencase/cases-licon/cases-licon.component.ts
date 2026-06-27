import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-cases-licon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cases-licon.component.html',
  styleUrl: './cases-licon.component.css'
})
export class CasesLIconComponent {
 @HostBinding("style.display") display = "contents";

  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Style props */
  @Input() casesLIconBorder: string | number | undefined = "";
  @Input() casesLIconPadding: string | number | undefined = "";
  @Input() casesLIconBackgroundColor: string | number | undefined = "";
  @Input() peopleIconHeight: string | number | undefined = "";
  @Input() peopleIconMaxHeight: string | number | undefined = "";

  get casesLIconStyle() {
    return {
      border: this.casesLIconBorder,
      padding: this.casesLIconPadding,
      "background-color": this.casesLIconBackgroundColor,
      height: this.peopleIconHeight,
      "max-height": this.peopleIconMaxHeight,
    };
  }
}
