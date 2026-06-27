import { Component, Output, EventEmitter, HostBinding, ViewChild } from "@angular/core";
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WInputFieldsIcon2Component } from "../winput-fields-icon2/winput-fields-icon2.component";
import { WInputFieldsIcon1Component } from "../winput-fields-icon1/winput-fields-icon1.component";
import { WInputFieldsIconComponent } from "../winput-fields-icon/winput-fields-icon.component";
import { Frame111Component } from '../frame111/frame111.component';
import { DirectionComponent } from '../direction/direction.component';

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

@Component({
  selector: 'app-web-emergency-action-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WInputFieldsIcon2Component,
    WInputFieldsIcon1Component,
    WInputFieldsIconComponent,
    DirectionComponent,
    Frame111Component
  ],
  templateUrl: './web-emergency-action-button.component.html',
  styleUrl: './web-emergency-action-button.component.css'
})
export class WebEmergencyActionButtonComponent {

  @HostBinding("style.display") display = "contents";
  @Output() close = new EventEmitter<void>();

  @ViewChild('typeComp')      typeComp!:      WInputFieldsIcon2Component;
  @ViewChild('locationComp')  locationComp!:  WInputFieldsIcon1Component;
  @ViewChild('severityComp')  severityComp!:  Frame111Component;
  @ViewChild('paramedicComp') paramedicComp!: WInputFieldsIconComponent;

  notes       = '';
  sending     = false;
  sendError   = '';
  sendSuccess = false;

  private get hospitalId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.hospitalId ?? 0;
  }

  private get userId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.userId ?? 0;
  }

  constructor(
    private http:     HttpClient,
    private router:   Router,
    private location: Location
  ) {}

  onClose(): void {
    this.resetForm();
    this.location.back();
  }

  sendBroadcast(): void {
    if (!this.typeComp?.selectedType) {
      this.sendError = 'Please select an Emergency Type.';
      return;
    }
    if (!this.locationComp?.location?.trim()) {
      this.sendError = 'Please enter a Location / Area.';
      return;
    }

    const severity           = this.severityComp?.selectedSeverity ?? '';
    const selectedParamedics = this.paramedicComp?.getSelectedParamedics() ?? [];

    const payload = {
      hospitalId:    this.hospitalId,
      emergencyType: this.typeComp.selectedType,
      severityLevel: severity,
      location:      this.locationComp.location,
      notes:         this.notes,
      targetUserIds: selectedParamedics.length > 0
                       ? selectedParamedics.map((p: any) => p.userId)
                       : null
    };

    this.sending   = true;
    this.sendError = '';

    this.http.post(`${BASE_URL}/notifications/broadcast`, payload)
      .subscribe({
        next: () => {
          this.sending     = false;
          this.sendSuccess = true;
          setTimeout(() => this.onClose(), 2000);
        },
        error: (err) => {
          this.sending   = false;
          this.sendError = err?.error?.message || 'Failed to send broadcast.';
        }
      });
  }

  private resetForm(): void {
    this.notes       = '';
    this.sendError   = '';
    this.sendSuccess = false;
    this.sending     = false;
    if (this.typeComp)     this.typeComp.selectedType = '';
    if (this.locationComp) this.locationComp.location = '';
  }
}