import { Component, ViewEncapsulation, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WebcardComponent } from "../webcard/webcard.component";
import { CommonModule } from "@angular/common";
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';

export interface ArchiveStats {
  totalCases:        number;
  completedToday:    number;
  avgAssessmentTime: string;
  successRate:       string;
  avgTimeTrend:      string;
  successRateTrend:  string;
}

@Component({
  selector: 'app-fram',
  standalone: true,
  imports: [CommonModule, WebcardComponent, EmergencyFabComponent],
  templateUrl: './fram.component.html',
  styleUrl: './fram.component.css'
})
export class FramComponent implements OnChanges {
  @HostBinding('style.display') display = 'contents';

  @Input() cases: any[] = [];

  stats: ArchiveStats = {
    totalCases:        0,
    completedToday:    0,
    avgAssessmentTime: '—',
    successRate:       '—',
    avgTimeTrend:      '',
    successRateTrend:  ''
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cases']) {
      this.computeStats(this.cases);
    }
  }

  private computeStats(cases: any[]): void {
    if (!cases || cases.length === 0) {
      this.stats = {
        totalCases:        0,
        completedToday:    0,
        avgAssessmentTime: 'N/A',
        successRate:       '0%',
        avgTimeTrend:      'No data yet',
        successRateTrend:  '↑ 0% completed'
      };
      return;
    }

    // ── Total cases ─────────────────────────────
    this.stats.totalCases = cases.length;

    // ── Completed today ──────────────────────────
    const today = new Date().toDateString();
    this.stats.completedToday = cases.filter(c =>
      c.status === 'Completed' &&
      new Date(c.caseDate ?? c.date).toDateString() === today
    ).length;

    // ── Success rate ─────────────────────────────
    const completed = cases.filter(c => c.status === 'Completed').length;
    const rate = Math.round((completed / cases.length) * 100);
    this.stats.successRate      = `${rate}%`;
    this.stats.successRateTrend = `↑ ${rate}% completed`;

    // ── Avg assessment time ──────────────────────
    const timeDiffs = cases
      .filter(c => c.onsetTime && c.handoverTime)
      .map(c => {
        const onset    = new Date(c.onsetTime).getTime();
        const handover = new Date(c.handoverTime).getTime();
        return (handover - onset) / (1000 * 60);
      })
      .filter(diff => diff > 0 && diff < 1440);

    if (timeDiffs.length > 0) {
      const avgMinutes = Math.round(
        timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length
      );
      this.stats.avgAssessmentTime = `${avgMinutes}m`;
      this.stats.avgTimeTrend      = `Based on ${timeDiffs.length} case${timeDiffs.length > 1 ? 's' : ''}`;
    } else {
      this.stats.avgAssessmentTime = 'N/A';
      this.stats.avgTimeTrend      = 'No data yet';
    }
  }

  get webCardItems() {
    return [
      {
        separatorA:          'Total cases',
        text:                'All time',
        num:                 String(this.stats.totalCases),
        iconClass:           'fa-solid fa-users',
        iconBg:              '#fff7e6',
        iconColor:           '#b45309',
        separatorAColor:     '#6b7280',
        casesThisWeekColor:  '#6b7280'
      },
      {
        separatorA:          'Completed today',
        text:                'Last 24 hours',
        num:                 String(this.stats.completedToday),
        iconClass:           'fa-solid fa-clipboard-check',
        iconBg:              '#e1f5ee',
        iconColor:           '#0f6e56',
        separatorAColor:     '#0fa573',
        casesThisWeekColor:  '#6b7280'
      },
      {
        separatorA:          'Avg assessment time',
        text:                this.stats.avgTimeTrend,
        num:                 this.stats.avgAssessmentTime,
        iconClass:           'fa-solid fa-clock',
        iconBg:              '#f1efe8',
        iconColor:           '#5f5e5a',
        separatorAColor:     '#6b7280',
        casesThisWeekColor:  '#0fa573'
      },
      {
        separatorA:          'Success rate',
        text:                this.stats.successRateTrend,
        num:                 this.stats.successRate,
        iconClass:           'fa-solid fa-arrow-trend-up',
        iconBg:              '#e1f5ee',
        iconColor:           '#0f6e56',
        separatorAColor:     '#0fa573',
        casesThisWeekColor:  '#0fa573'
      }
    ];
  }
}