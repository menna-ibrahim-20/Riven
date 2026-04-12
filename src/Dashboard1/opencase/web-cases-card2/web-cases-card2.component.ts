import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VitalcardComponent } from "../vitalcard/vitalcard.component";

@Component({
  selector: 'app-web-cases-card2',
  standalone: true,
  imports: [CommonModule, VitalcardComponent],
  templateUrl: './web-cases-card2.component.html',
  styleUrl: './web-cases-card2.component.css'
})
export class WebCasesCard2Component {
  
  @HostBinding("style.display") display = "contents";

  vitalCardItems = [
    {
      property1: "Critical" as const,
      num: "165/95 mmHg",
      sTitle: "Blood Pressure",
    },
    {
      property1: "Normal" as const,
      num: "88 bpm",
      sTitle: "Heart Rate",
    },
    {
      property1: "Normal" as const,
      num: "18/min",
      sTitle: "Respiratory Rate",
    },
  ];
  vitalCardItems1 = [
    {
      property1: "Critical" as const,
      num: "94%",
      sTitle: "Oxygen Saturation",
    },
    {
      property1: "Normal" as const,
      num: "98.6°F",
      sTitle: "Temperature",
    },
    {
      property1: "Normal" as const,
      num: "145 mg/dL",
      sTitle: "Glucose Level",
    },
  ];
}
