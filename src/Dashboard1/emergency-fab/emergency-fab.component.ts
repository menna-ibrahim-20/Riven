import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebEmergencyActionButtonComponent } from '../EmergencyActionButton/web-emergency-action-button/web-emergency-action-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-fab',
  standalone: true,
  imports: [CommonModule,WebEmergencyActionButtonComponent],
  templateUrl: './emergency-fab.component.html',
  styleUrl: './emergency-fab.component.css'
})
export class EmergencyFabComponent {

  constructor(private router: Router) {}

  goToEmergency(): void {
    this.router.navigate(['/dashboard/emergency']);
  }
}