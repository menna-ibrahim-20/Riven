import { Component, ViewEncapsulation, HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-web-card-par',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-card-par.component.html',
  styleUrl: './web-card-par.component.css'
})
export class WebCardParComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() cardSeparators: string = "+12%";
  @Input() text: string = "Cases This Week";
  @Input() num: string = "24";
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Style props */
  @Input() iconTypeBackgroundColor: string | number | undefined = "";
  @Input() homeIconHeight: string | number | undefined = "";
  @Input() homeIconMaxHeight: string | number | undefined = "";
  @Input() cardSeparatorsColor: string | number | undefined = "";
  @Input() separatorsTwoColor: string | number | undefined = "";
  @Input() casesThisWeekColor: string | number | undefined = "";
  @Input() homeIconBorder: string | number | undefined = "";
  @Input() homeIconPadding: string | number | undefined = "";
  @Input() homeIconBackgroundColor: string | number | undefined = "";

  get iconTypeStyle() {
    return {
      "background-color": this.iconTypeBackgroundColor,
    };
  }

  get homeIconStyle() {
    return {
      height: this.homeIconHeight,
      "max-height": this.homeIconMaxHeight,
      border: this.homeIconBorder,
      padding: this.homeIconPadding,
      "background-color": this.homeIconBackgroundColor,
    };
  }

  get cardSeparatorsStyle() {
    return {
      color: this.cardSeparatorsColor,
    };
  }

  get separatorsTwoStyle() {
    return {
      color: this.separatorsTwoColor,
    };
  }

  get casesThisWeekStyle() {
    return {
      color: this.casesThisWeekColor,
    };
  }
}
