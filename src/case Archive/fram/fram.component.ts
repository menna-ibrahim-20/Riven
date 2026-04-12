import { Component ,ViewEncapsulation, HostBinding ,OnInit} from '@angular/core';
import {  WebcardComponent } from "../webcard/webcard.component";
import { CommonModule } from "@angular/common";
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';


export interface ArchiveStats {
  totalCases: number;
  completedToday: number;
  avgAssessmentTime: string;
  successRate: string;
  avgTimeTrend: string;
  successRateTrend: string;
}


@Component({
  selector: 'app-fram',
  standalone: true,
  imports: [CommonModule, WebcardComponent,EmergencyFabComponent],
  templateUrl: './fram.component.html',
  styleUrl: './fram.component.css'
})
export class FramComponent  implements OnInit {
  @HostBinding('style.display') display = 'contents';

  stats: ArchiveStats = {
    totalCases: 6,
    completedToday: 0,
    avgAssessmentTime: '8.7m',
    successRate: '94%',
    avgTimeTrend: '↓ 5% faster',
    successRateTrend: '↑ 3% from last month'
  };

  get webCardItems() {
    return [
      {
        separatorA: 'Total cases',
        text: 'All time',
        num: String(this.stats.totalCases),
        iconClass: 'fa-solid fa-users',
        iconBg: '#fff7e6',
        iconColor: '#b45309',
        separatorAColor: '#6b7280',
        casesThisWeekColor: '#6b7280'
      },
      {
        separatorA: 'Completed today',
        text: 'Last 24 hours',
        num: String(this.stats.completedToday),
        iconClass: 'fa-solid fa-clipboard-check',
        iconBg: '#e1f5ee',
        iconColor: '#0f6e56',
        separatorAColor: '#0fa573',
        casesThisWeekColor: '#6b7280'
      },
      {
        separatorA: 'Avg assessment time',
        text: this.stats.avgTimeTrend,
        num: this.stats.avgAssessmentTime,
        iconClass: 'fa-solid fa-clock',
        iconBg: '#f1efe8',
        iconColor: '#5f5e5a',
        separatorAColor: '#6b7280',
        casesThisWeekColor: '#0fa573'
      },
      {
        separatorA: 'Success rate',
        text: this.stats.successRateTrend,
        num: this.stats.successRate,
        iconClass: 'fa-solid fa-arrow-trend-up',
        iconBg: '#e1f5ee',
        iconColor: '#0f6e56',
        separatorAColor: '#0fa573',
        casesThisWeekColor: '#0fa573'
      }
    ];
  }

  ngOnInit(): void {
    // TODO: استبدل بـ API call
    // this.statsService.getArchiveStats().subscribe(s => this.stats = s);
  }
}