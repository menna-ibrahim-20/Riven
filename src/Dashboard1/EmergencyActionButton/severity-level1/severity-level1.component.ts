import { Component, HostBinding, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SeverityLevelComponent } from '../severity-level/severity-level.component';

@Component({
  selector: 'app-severity-level1',
  standalone: true,
  imports: [SeverityLevelComponent, CommonModule],
  templateUrl: './severity-level1.component.html',
  styleUrl: './severity-level1.component.css'
})
export class SeverityLevel1Component {


  @HostBinding("style.display") display = "contents";
  @Input() property1: string | number | undefined = "Low";

  selectedSeverity: string = '';

  onSeveritySelected(level: string): void {
    this.selectedSeverity = level;
  }

  severityLevelItems = [
    { low: "Low",    advisory: "Advisory", advisoryMargin: undefined },
    { low: "Medium", advisory: "Warning",  advisoryMargin: "0" as const },
    { low: "High",   advisory: "Critical", advisoryMargin: "0" as const },
  ];
}
