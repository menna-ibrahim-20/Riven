import { Component, ViewEncapsulation, HostBinding } from "@angular/core";
import { SeverityLevel1Component } from "../severity-level1/severity-level1.component";
import { SeverityLevelComponent } from "../severity-level/severity-level.component";

@Component({
  selector: 'app-frame111',
  standalone: true,
  imports: [SeverityLevel1Component, SeverityLevelComponent],
  templateUrl: './frame111.component.html',
  styleUrl: './frame111.component.css'
})
export class Frame111Component {

  @HostBinding("style.display") display = "contents";
}
