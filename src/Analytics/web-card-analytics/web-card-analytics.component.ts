import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-card-analytics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-card-analytics.component.html',
  styleUrl: './web-card-analytics.component.css'
})


export class WebCardAnalyticsComponent implements OnInit {
  @HostBinding('style.display') display = 'contents';

  @Input() cardSeparators: string = '+12%';
  @Input() text: string = 'Cases This Week';
  @Input() num: string = '24';
  @Input() iconTypeBackgroundColor: string = '#e8f0fe';
  @Input() casesThisWeekColor: string = '#4a4f52';

  private static count = 0;
  idx!: number;

  icons    = ['fa-file-medical','fa-user-nurse','fa-clock','fa-circle-check'];
  iconClrs = ['#1976d2','#0fa573','#f59e0b','#0fa573'];

  ngOnInit(): void {
    this.idx = WebCardAnalyticsComponent.count % 4;
    WebCardAnalyticsComponent.count++;
  }

  get iconClass(): string  { return this.icons[this.idx]; }
  get iconColor(): string  { return this.iconClrs[this.idx]; }
  get badgePositive(): boolean {
    return this.cardSeparators.startsWith('+') || this.cardSeparators.includes('faster');
  }
}