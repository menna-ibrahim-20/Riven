import { CommonModule } from "@angular/common";
import { Component, HostBinding, Output, EventEmitter } from "@angular/core";
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-winput-fields-icon1',
  standalone: true,
  imports: [FormsModule ,CommonModule],
  templateUrl: './winput-fields-icon1.component.html',
  styleUrl: './winput-fields-icon1.component.css'
})
export class WInputFieldsIcon1Component {

  @HostBinding("style.display") display = "contents";

  location: string = '';
  isLocating: boolean = false;
  locationError: string = '';

  @Output() locationChange = new EventEmitter<string>();

 getCurrentLocation(): void {
  if (!navigator.geolocation) {
    this.locationError = 'Geolocation not supported.';
    return;
  }

  this.isLocating = true;
  this.locationError = '';

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      console.log('Location found:', lat, lng); // ← للـ debugging

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        this.location = data.display_name ?? `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      } catch {
        this.location = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      }

      this.locationChange.emit(this.location);
      this.isLocating = false;
    },
    (err) => {
      this.isLocating = false;
      console.error('Geolocation error:', err); // ← للـ debugging
      if (err.code === 1) this.locationError = 'Permission denied — please allow location access.';
      else if (err.code === 2) this.locationError = 'Position unavailable.';
      else this.locationError = 'Timeout — try again.';
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
  );
}
}
