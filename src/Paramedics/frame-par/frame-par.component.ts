import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-frame-par',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frame-par.component.html',
  styleUrl: './frame-par.component.css'
})
export class FrameParComponent {
  @HostBinding('style.display') display = 'contents';

  @Input() hospitalOverview:  string  = '';
  @Input() isLoading:         boolean = false;
  @Input() totalParamedics:   number  = 0;
  @Input() activeParamedics:  number  = 0;
  @Input() avgTime:           string  = '—';
  @Input() casesThisWeek:     number  = 0;
}
