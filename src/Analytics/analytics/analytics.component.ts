import { Component ,  ViewEncapsulation,HostBinding,Input,} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {
  @HostBinding('style.display') display = 'contents';
  @Input() property1: string | number | undefined = 'Default';
  @Input() text: string = 'Analytics';
}



