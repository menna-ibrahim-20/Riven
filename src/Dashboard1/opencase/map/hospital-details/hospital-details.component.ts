import { Component, ViewEncapsulation, HostBinding } from "@angular/core";

@Component({
  selector: 'app-hospital-details',
  standalone: true,
  imports: [],
  templateUrl: './hospital-details.component.html',
  styleUrl: './hospital-details.component.css'
})
export class HospitalDetailsComponent {

  @HostBinding("style.display") display = "contents";
}
