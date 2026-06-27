import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebCardComponent } from '../web-card/web-card.component';

export interface OverviewStats {
  casesThisWeek:    string;
  enRoute:          string;
  activeParamedics: string;
  availableBeds:    string;
}

@Component({
  selector: 'app-frame-component',
  standalone: true,
  imports: [WebCardComponent, CommonModule],
  templateUrl: './frame-component.component.html',
  styleUrl: './frame-component.component.css'
})
export class FrameComponentComponent {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';

  @Input() stats: OverviewStats = {
    casesThisWeek:    '—',
    enRoute:          '—',
    activeParamedics: '—',
    availableBeds:    '—',
  };
}