import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: 'app-vitals-info',
  standalone: true,
  imports: [],
  templateUrl: './vitals-info.component.html',
  styleUrl: './vitals-info.component.css'
})
export class VitalsInfoComponent {

  @HostBinding("style.display") display = "contents";
}
