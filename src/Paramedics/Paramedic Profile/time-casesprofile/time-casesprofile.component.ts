import { Component, HostBinding, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-time-casesprofile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-casesprofile.component.html',
  styleUrl: './time-casesprofile.component.css'
})
export class TimeCasesprofileComponent {
  @HostBinding("style.display") display = "contents";

  @Input() activeTab: string = 'today'; // ← استقبل الـ active من الأب
  @Output() tabChange = new EventEmitter<string>();

  tabs = [
    { key: 'today', label: 'To Day'     },
    { key: 'week',  label: 'This Week'  },
    { key: 'month', label: 'This Month' },
  ];

  selectTab(key: string): void {
    this.tabChange.emit(key); // ← بعّت للأب بس، متغيرش هنا
  }
}