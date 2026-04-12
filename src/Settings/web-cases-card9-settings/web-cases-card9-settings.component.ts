import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

interface GeneralSettingsForm {
  hospitalName: string;
  address: string;
  cityStateZip: string;
  phone: string;
  strokeBeds: number;
}


@Component({
  selector: 'app-web-cases-card9-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './web-cases-card9-settings.component.html',
  styleUrl: './web-cases-card9-settings.component.css'
})


export class WebCasesCard9SettingsComponent  implements OnInit {
  @HostBinding('style.display') display = 'contents';

  hospitalImageUrl = '';
  isSaving = false;
  savedSuccess = false;
  showValidationError = false;

  form: GeneralSettingsForm = {
    hospitalName: '',
    address: '',
    cityStateZip: '',
    phone: '',
    strokeBeds: 6
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // TODO: load from API
    // this.http.get<GeneralSettingsForm>(`${environment.apiUrl}/settings/general`)
    //   .subscribe(data => this.form = data);
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/Frame 467.png';
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => { this.hospitalImageUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  isFormValid(): boolean {
    return !!(
      this.form.hospitalName.trim() &&
      this.form.address.trim() &&
      this.form.cityStateZip.trim() &&
      this.form.phone.trim()
    );
  }

  saveGeneral(): void {
    if (!this.isFormValid()) {
      this.showValidationError = true;
      return;
    }

    this.showValidationError = false;
    this.isSaving = true;
    this.savedSuccess = false;

    // TODO: API
    // this.http.put(`${environment.apiUrl}/settings/general`, this.form)
    //   .subscribe({
    //     next: () => { this.isSaving = false; this.savedSuccess = true; setTimeout(() => this.savedSuccess = false, 3000); },
    //     error: () => { this.isSaving = false; }
    //   });

    setTimeout(() => {
      this.isSaving = false;
      this.savedSuccess = true;
      setTimeout(() => this.savedSuccess = false, 3000);
    }, 1000);
  }
}
