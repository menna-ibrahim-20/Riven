import { Component,  ViewEncapsulation,HostBinding,Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'web-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-card.component.html',
  styleUrl: './web-card.component.css'
})
export class WebCardComponent {

  @Input() icon: string = 'fa-heart-pulse';
  @Input() iconBgColor: string = '#EFF6FF';
  @Input() iconColor: string = '#3B82F6';
  @Input() badge: string = '+12%';
  @Input() badgeColor: string = '#22c55e';
  @Input() num: string = '24';
  @Input() numColor: string = '';
  @Input() text: string = 'Cases This Week';
  @Input() property1: string = 'Default';
  
  
}