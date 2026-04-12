import { Component,ViewEncapsulation, HostBinding ,EventEmitter,Output} from '@angular/core';
import { HospitalDetailsComponent } from '../hospital-details/hospital-details.component';
import { MapCallComponent } from '../map-call/map-call.component';


@Component({
  selector: 'app-map-root',
  standalone: true,
  imports: [HospitalDetailsComponent, MapCallComponent],
  templateUrl: './map-root.component.html',
  styleUrl: './map-root.component.css'
})
export class MapRootComponent {

  @HostBinding("style.display") display = "contents";
  @Output() close = new EventEmitter<void>()

  onClose(): void {
    this.close.emit();
  }
}