import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EyeparComponent } from '../eyepar/eyepar.component';
import { Paramedic } from '../Par.Service';

@Component({
  selector: 'app-web-cases-card1-par',
  standalone: true,
  imports: [CommonModule, EyeparComponent],
  templateUrl: './web-cases-card1-par.component.html',
  styleUrl: './web-cases-card1-par.component.css'
})
export class WebCasesCard1ParComponent {
  @HostBinding('style.display') display = 'contents';

  @Input()  paramedics: Paramedic[] = [];
  @Output() viewParamedic = new EventEmitter<Paramedic>();

  statusClass(s: string) {
    return s === 'online' ? 'st-online' : s === 'enroute' ? 'st-enroute' : 'st-offline';
  }
  statusLabel(s: string) {
    return s === 'online' ? 'Online' : s === 'enroute' ? 'En Route' : 'Offline';
  }
  isActive(last: string) {
    return last.toLowerCase() === 'active now';
  }
}
