import {Component,HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-profile1-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile1-add.component.html',
  styleUrl: './profile1-add.component.css'
})
export class Profile1AddComponent {


  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() text: string = "Add Paramedic";
  @Input() showUpdateReadiness: boolean = false;
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Style props */
  @Input() profileBackgroundColor: string | number | undefined = "";
  @Input() profileAlignSelf: string | number | undefined = "";
  @Input() profileFlex: string | number | undefined = "";
  @Input() profileIconHeight: string | number | undefined = "";
  @Input() profileIconMaxHeight: string | number | undefined = "";
  @Input() updateReadinessFontSize: string | number | undefined = "";
  @Input() updateReadinessFontWeight: string | number | undefined = "";
  @Input() updateReadinessFontFamily: string | number | undefined = "";
  @Input() updateReadinessColor: string | number | undefined = "";
  @Input() updateReadinessTextAlign: string | number | undefined = "";

  get profileStyle() {
    return {
      "background-color": this.profileBackgroundColor,
      "align-self": this.profileAlignSelf,
      flex: this.profileFlex,
    };
  }

  get profileIconStyle() {
    return {
      height: this.profileIconHeight,
      "max-height": this.profileIconMaxHeight,
    };
  }

  get updateReadinessStyle() {
    return {
      "font-size": this.updateReadinessFontSize,
      "font-weight": this.updateReadinessFontWeight,
      "font-family": this.updateReadinessFontFamily,
      color: this.updateReadinessColor,
      "text-align": this.updateReadinessTextAlign,
    };
  }
}
