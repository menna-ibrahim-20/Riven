import {Component,ViewEncapsulation,HostBinding,Input,} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-winput-fields-icon4-settings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winput-fields-icon4-settings.component.html',
  styleUrl: './winput-fields-icon4-settings.component.css'
})
export class WInputFieldsIcon4SettingsComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() tittle: string = "Hospital Name";
  @Input() hopital: string = "";
  @Input() enterPatientNameType: string = "";
  @Input() down: string = "";
  @Input() showDown: boolean = false;
  /** Variant props */
  @Input() property1: string | number | undefined = "Default";
  /** Style props */
  @Input() wInputFieldsIconAlignSelf: string | number | undefined = "";
  @Input() wInputFieldsIconFlex: string | number | undefined = "";
  @Input() frameDivGap: string | number | undefined = "";
  @Input() hopitalIconMaxHeight: string | number | undefined = "";
  @Input() hopitalIconHeight: string | number | undefined = "";
  @Input() enterPatientNameWidth: string | number | undefined = "";
  @Input() enterPatientNameBorder: string | number | undefined = "";
  @Input() enterPatientNameOutline: string | number | undefined = "";
  @Input() enterPatientNameBackgroundColor: string | number | undefined = "";
  @Input() enterPatientNameDisplay: string | number | undefined = "";
  @Input() downIconBorder: string | number | undefined = "";
  @Input() downIconPadding: string | number | undefined = "";
  @Input() downIconBackgroundColor: string | number | undefined = "";

  get wInputFieldsIconStyle() {
    return {
      "align-self": this.wInputFieldsIconAlignSelf,
      flex: this.wInputFieldsIconFlex,
    };
  }

  get frameDivStyle() {
    return {
      gap: this.frameDivGap,
    };
  }

  get hopitalIconStyle() {
    return {
      "max-height": this.hopitalIconMaxHeight,
      height: this.hopitalIconHeight,
    };
  }

  get enterPatientNameStyle() {
    return {
      width: this.enterPatientNameWidth,
      border: this.enterPatientNameBorder,
      outline: this.enterPatientNameOutline,
      "background-color": this.enterPatientNameBackgroundColor,
      display: this.enterPatientNameDisplay,
    };
  }

  get downIconStyle() {
    return {
      border: this.downIconBorder,
      padding: this.downIconPadding,
      "background-color": this.downIconBackgroundColor,
    };
  }
}
