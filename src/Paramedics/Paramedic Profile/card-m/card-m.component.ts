import { Component, HostBinding, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-card-m',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-m.component.html',
  styleUrl: './card-m.component.css'
})
export class CardMComponent {
  @HostBinding("style.display") display = "contents";

  @Input() secText: string = "12% vs last period";
  @Input() num: string = "8";
  @Input() title: string = "Total Cases";
  @Input() iconClass: string = "fa-solid fa-folder";
  @Input() extra: boolean = true;
  @Input() showUpIcon: boolean = false;
  @Input() property1: string | number | undefined = "Default";
  @Input() dividerColor: string | number | undefined = "";
  @Input() vsLastPeriodColor: string | number | undefined = "";

  get dividerStyle() {
    return { color: this.dividerColor };
  }
  get vsLastPeriodStyle() {
    return { color: this.vsLastPeriodColor };
  }
}
