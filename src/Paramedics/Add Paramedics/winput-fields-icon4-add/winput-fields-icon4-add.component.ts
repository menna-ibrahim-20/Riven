import {Component,ViewEncapsulation, HostBinding, Input,} from "@angular/core";
import { CommonModule } from "@angular/common";
import { DownloadIconComponent } from "../../../Dashboard1/opencase/download-icon/download-icon.component";

@Component({
  selector: 'app-winput-fields-icon4-add',
  standalone: true,
  imports: [CommonModule, DownloadIconComponent],
  templateUrl: './winput-fields-icon4-add.component.html',
  styleUrl: './winput-fields-icon4-add.component.css'
})
export class WInputFieldsIcon4AddComponent {

  @HostBinding("style.display") display = "contents";

  /** Value props */
  @Input() tittle: string = "Hospital Name";
  @Input() hopital: string = "";
  @Input() showDown: boolean = false;
  @Input() showDiv: boolean = false;
  @Input() divVisible: boolean = false;
  @Input() property11: string | number | undefined = "";
  @Input() showDown1: boolean = false;
   @Input() downloadUrl: string = ""; 
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
  @Input() divWidth: string | number | undefined = "";
  @Input() divBorder: string | number | undefined = "";
  @Input() divOutline: string | number | undefined = "";
  @Input() divFontFamily: string | number | undefined = "";
  @Input() divFontSize: string | number | undefined = "";
  @Input() divBackgroundColor: string | number | undefined = "";
  @Input() divFlex: string | number | undefined = "";
  @Input() divColor: string | number | undefined = "";
  @Input() divTextAlign: string | number | undefined = "";
  @Input() divWidth1: string | number | undefined = "";
  @Input() divBorder1: string | number | undefined = "";
  @Input() divOutline1: string | number | undefined = "";
  @Input() divFontFamily1: string | number | undefined = "";
  @Input() divFontSize1: string | number | undefined = "";
  @Input() divBackgroundColor1: string | number | undefined = "";
  @Input() divFlex1: string | number | undefined = "";
  @Input() divColor1: string | number | undefined = "";
  @Input() divTextAlign1: string | number | undefined = "";
  @Input() divMaxHeight: string | number | undefined = "";

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

get divStyle() {
  return {
    width: this.divWidth1 || this.enterPatientNameWidth,
    border: this.divBorder1 || this.enterPatientNameBorder,
    outline: this.divOutline1 || this.enterPatientNameOutline,
    "background-color": this.divBackgroundColor1 || this.enterPatientNameBackgroundColor,
    display: this.enterPatientNameDisplay,
    "font-family": this.divFontFamily1,
    "font-size": this.divFontSize1,
    flex: this.divFlex1,
    color: this.divColor1,
    "text-align": this.divTextAlign1,
    "max-height": this.divMaxHeight,
  };
}

  get div1Style() {
    return {
      width: this.divWidth,
      border: this.divBorder,
      outline: this.divOutline,
      "font-family": this.divFontFamily,
      "font-size": this.divFontSize,
      "background-color": this.divBackgroundColor,
      flex: this.divFlex,
      color: this.divColor,
      "text-align": this.divTextAlign,
    };
  }

  get divStyle1() {
    return {
      width: this.divWidth1,
      border: this.divBorder1,
      outline: this.divOutline1,
      "font-family": this.divFontFamily1,
      "font-size": this.divFontSize1,
      "background-color": this.divBackgroundColor1,
      flex: this.divFlex1,
      color: this.divColor1,
      "text-align": this.divTextAlign1,
      "max-height": this.divMaxHeight,
    };
  }
}
