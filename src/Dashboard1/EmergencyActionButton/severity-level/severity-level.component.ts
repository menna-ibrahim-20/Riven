import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-severity-level',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './severity-level.component.html',
  styleUrl: './severity-level.component.css'
})
export class SeverityLevelComponent {

  @HostBinding("style.display") display = "contents";

  @Input() low: string = "";
  @Input() advisory: string = "";
  @Input() advisoryMargin: string | number | undefined = "";
  @Input() selected: boolean = false;
  @Output() selectedChange = new EventEmitter<string>();

  get advisoryStyle() {
    return { margin: this.advisoryMargin };
  }

  select(): void {
    this.selectedChange.emit(this.low);
  }
}
