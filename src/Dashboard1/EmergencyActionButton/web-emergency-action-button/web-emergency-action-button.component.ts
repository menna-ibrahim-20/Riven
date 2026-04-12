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


// ══════════════════════════════════════════════════════
//  CONFIG — غيّر دول لما تاخد الـ API
// ══════════════════════════════════════════════════════
const BASE_URL   = 'https://your-api.example.com';
const AUTH_TOKEN = ''; // ← حط الـ token هنا


@Component({
  selector: 'app-web-emergency-action-button',
  standalone: true,
  imports: [   CommonModule,
    FormsModule,
    WInputFieldsIcon2Component,
    WInputFieldsIcon1Component,
    WInputFieldsIconComponent,
    DirectionComponent,
    Frame111Component],
  templateUrl: './web-emergency-action-button.component.html',
  styleUrl: './web-emergency-action-button.component.css'
})

export class WebEmergencyActionButtonComponent {

  @HostBinding("style.display") display = "contents";
  @Output() close = new EventEmitter<void>();

  @ViewChild('typeComp')     typeComp!: WInputFieldsIcon2Component;
  @ViewChild('locationComp') locationComp!: WInputFieldsIcon1Component;
  @ViewChild('severityComp') severityComp!: Frame111Component;

  notes       = '';
  sending     = false;
  sendError   = '';
  sendSuccess = false;

  constructor(
    private http: HttpClient,
    private router: Router,
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

    const payload = {
      emergency_type: this.typeComp.selectedType,
      location:       this.locationComp.location,
      notes:          this.notes,
    };

    this.sending   = true;
    this.sendError = '';

    setTimeout(() => {
      this.sending     = false;
      this.sendSuccess = true;
      setTimeout(() => this.onClose(), 2000);
    }, 1200);
  }

  private resetForm(): void {
    this.notes       = '';
    this.sendError   = '';
    this.sendSuccess = false;
    this.sending     = false;
    if (this.typeComp)     this.typeComp.selectedType  = '';
    if (this.locationComp) this.locationComp.location  = '';
  }
}