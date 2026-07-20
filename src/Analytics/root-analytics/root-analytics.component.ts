import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/services';
import { WebCardAnalyticsComponent } from '../web-card-analytics/web-card-analytics.component';
import { WebCasesCard3AnalyticsComponent } from '../web-cases-card3-analytics/web-cases-card3-analytics.component';
import { WebCasesCard4AnalyticsComponent } from '../web-cases-card4-analytics/web-cases-card4-analytics.component';
import { WebCasesCard5AnalyticsComponent } from '../web-cases-card5-analytics/web-cases-card5-analytics.component';
import { WebCasesCard6AnalyticsComponent } from '../web-cases-card6-analytics/web-cases-card6-analytics.component';
import { WebCasesCard7AnalyticsComponent } from '../web-cases-card7-analytics/web-cases-card7-analytics.component';
import { WebCasesCard8AnalyticsComponent } from '../web-cases-card8-analytics/web-cases-card8-analytics.component';
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

export interface KpiData {
  casesThisWeek: number;
  casesChangePercent: string;
  activeParamedics: number;
  avgAssessmentTime: string;
  avgAssessmentChange: string;
  successRate: string;
  successRateChange: string;
}

export interface ChartSeriesData {
  labels: string[];
  actual: number[];
  average?: number[];
  target?: number[];
}

export interface SeverityData {
  mild: number;
  moderate: number;
  severe: number;
}

export interface HourlyData {
  labels: string[];
  data: number[];
}

export interface AnalyticsApiResponse {
  kpi: KpiData;
  dailyCaseVolume: ChartSeriesData;
  assessmentTime: ChartSeriesData;
  hourlyCases: HourlyData;
  criticalDiagnosis: HourlyData;
  severity: SeverityData;
}

@Component({
  selector: 'app-root-analytics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WebCardAnalyticsComponent,
    WebCasesCard3AnalyticsComponent,
    WebCasesCard4AnalyticsComponent,
    WebCasesCard7AnalyticsComponent,
    WebCasesCard8AnalyticsComponent,
    WebCasesCard5AnalyticsComponent,
    WebCasesCard6AnalyticsComponent,
    EmergencyFabComponent
  ],
  templateUrl: './root-analytics.component.html',
  styleUrl: './root-analytics.component.css'
})
export class RootAnalyticsComponent implements OnInit {

  @HostBinding('style.display') display = 'contents';

  reportType = '';
  dateFrom   = '';
  dateTo     = '';
  isLoading  = false;
  errorMsg   = '';



private authService = inject(AuthService);

private get hospitalId(): number {
  return this.authService.getHospitalId() ?? 0;
}

  webCardItems = [
    {
      cardSeparators: '+0',
      text:           'Cases This Week',
      num:            '—',
      iconTypeBackgroundColor: '#e8f0fe',
      casesThisWeekColor:      '#0fa573',
    },
    {
      cardSeparators: 'Active Paramedics',
      text:           'Online now',
      num:            '—',
      iconTypeBackgroundColor: '#e6f7f2',
      casesThisWeekColor:      '#0fa573',
    },
    {
      cardSeparators: 'Avg Assessment Time',
      text:           '—',
      num:            '—',
      iconTypeBackgroundColor: '#fff7e6',
      casesThisWeekColor:      '#0fa573',
    },
    {
      cardSeparators: 'Success Rate',
      text:           '—',
      num:            '—',
      iconTypeBackgroundColor: '#e6f7f2',
      casesThisWeekColor:      '#0fa573',
    },
  ];

  dailyCaseVolume: ChartSeriesData = {
    labels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    actual:  [0, 0, 0, 0, 0, 0, 0],
    average: [0, 0, 0, 0, 0, 0, 0],
  };

  assessmentTime: ChartSeriesData = {
    labels: ['Week 1','Week 2','Week 3','Week 4'],
    actual: [0, 0, 0, 0],
    target: [10, 10, 10, 10],
  };

  hourlyCases: HourlyData = {
    labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
    data:   [0, 0, 0, 0, 0, 0],
  };

  criticalDiagnosis: HourlyData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    data:   [0, 0, 0, 0, 0, 0],
  };

  severity: SeverityData = { mild: 0, moderate: 0, severe: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const today    = new Date();
    const monthAgo = new Date(Date.now() - 30 * 86400000);
    this.dateTo   = today.toISOString().split('T')[0];
    this.dateFrom = monthAgo.toISOString().split('T')[0];
    this.loadAnalytics();
  }

  // ── helpers للـ field names اللي ممكن تيجي بـ camelCase أو PascalCase ──
  private getDate(c: any): Date {
    const raw = c.caseDate ?? c.CaseDate ?? c.createdAt ?? c.CreatedAt ?? '';
    return new Date(raw);
  }

  private getStatus(c: any): string {
    return (c.status ?? c.Status ?? '').toLowerCase().trim();
  }

  private getSeverity(c: any): string {
    return (c.severity ?? c.Severity ?? '').toLowerCase().trim();
  }

  private computeFromCases(cases: any[], activeParamedics: number): void {

    const now       = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    // ── Cases this week ──
    const casesThisWeek = cases.filter(c => {
      const d = this.getDate(c);
      return !isNaN(d.getTime()) && d >= weekStart && d <= now;
    });

    // ── Avg assessment time ──
    const timeDiffs = cases
      .filter(c => (c.onsetTime ?? c.OnsetTime) && (c.handoverTime ?? c.HandoverTime))
      .map(c => {
        const onset    = new Date(c.onsetTime    ?? c.OnsetTime).getTime();
        const handover = new Date(c.handoverTime ?? c.HandoverTime).getTime();
        return (handover - onset) / (1000 * 60);
      })
      .filter(diff => diff > 0 && diff < 1440);

    const avgMin = timeDiffs.length > 0
      ? Math.round(timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length)
      : null;

    // ── Success rate ──
    const completed = cases.filter(c => this.getStatus(c) === 'completed').length;
    const total     = cases.length;
    const rate      = total > 0 ? Math.round((completed / total) * 100) : 0;

    // ── Severity ──
    const mild     = cases.filter(c => this.getSeverity(c) === 'mild').length;
    const moderate = cases.filter(c => this.getSeverity(c) === 'moderate').length;
    const severe   = cases.filter(c =>
      ['severe', 'critical', 'high'].includes(this.getSeverity(c))
    ).length;

    // ── Daily case volume (آخر 7 أيام) ──
    const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const dailyMap  = Array(7).fill(0);
    casesThisWeek.forEach(c => {
      const day = this.getDate(c).getDay();
      if (day >= 0 && day < 7) dailyMap[day]++;
    });
    const orderedLabels: string[] = [];
    const orderedActual: number[] = [];
    for (let i = 0; i < 7; i++) {
      const idx = (now.getDay() - 6 + i + 7) % 7;
      orderedLabels.push(dayLabels[idx]);
      orderedActual.push(dailyMap[idx]);
    }
    const avgPerDay = Math.round(casesThisWeek.length / 7) || 0;

    // ── Hourly distribution ──
    const hourlyBuckets = [0, 0, 0, 0, 0, 0];
    cases.forEach(c => {
      const raw = c.onsetTime ?? c.OnsetTime;
      if (!raw) return;
      const hour   = new Date(raw).getHours();
      const bucket = Math.floor(hour / 4);
      if (bucket >= 0 && bucket < 6) hourlyBuckets[bucket]++;
    });

    // ── Critical Diagnosis (آخر 6 شهور) ──
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun',
                        'Jul','Aug','Sep','Oct','Nov','Dec'];

    const monthlyRate: Record<string, { completed: number; total: number }> = {};

    cases.forEach(c => {
      const d = this.getDate(c);
      if (isNaN(d.getTime())) return;
      const key = monthNames[d.getMonth()];
      if (!monthlyRate[key]) monthlyRate[key] = { completed: 0, total: 0 };
      monthlyRate[key].total++;
      if (this.getStatus(c) === 'completed') monthlyRate[key].completed++;
    });

    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now);
      d.setMonth(now.getMonth() - (5 - i));
      return monthNames[d.getMonth()];
    });

    const diagData = last6Months.map(m =>
      monthlyRate[m] && monthlyRate[m].total > 0
        ? Math.round((monthlyRate[m].completed / monthlyRate[m].total) * 100)
        : 0
    );

    console.log('📦 Total cases received:', cases.length);
    console.log('📋 Sample statuses:', cases.slice(0, 5).map(c => c.status ?? c.Status));
    console.log('📅 Sample dates:', cases.slice(0, 5).map(c => c.caseDate ?? c.CaseDate ?? c.createdAt));
    console.log('📊 monthlyRate:', monthlyRate);
    console.log('📊 last6Months:', last6Months);
    console.log('📊 diagData:', diagData);

    // ── Update UI ──
    this.webCardItems[0].num            = String(casesThisWeek.length);
    this.webCardItems[0].cardSeparators = `+${casesThisWeek.length}`;
    this.webCardItems[1].num            = String(activeParamedics);
    this.webCardItems[2].num            = avgMin !== null ? `${avgMin}m` : '—';
    this.webCardItems[2].text           = avgMin !== null
      ? `↓ Based on ${timeDiffs.length} cases` : 'No data yet';
    this.webCardItems[3].num            = total > 0 ? `${rate}%` : '—';
    this.webCardItems[3].text           = total > 0
      ? `↑ ${rate}% completed` : 'No data yet';

    this.severity = { mild, moderate, severe };

    this.dailyCaseVolume = {
      labels:  orderedLabels,
      actual:  orderedActual,
      average: Array(7).fill(avgPerDay),
    };

    this.hourlyCases = {
      labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
      data:   hourlyBuckets,
    };

    this.criticalDiagnosis = {
      labels: last6Months,
      data:   diagData,
    };
  }

  loadAnalytics(): void {
    if (!this.hospitalId) return;
    this.isLoading = true;

    forkJoin({
      analytics: this.http.get<any>(`${BASE_URL}/Cases/analytics/${this.hospitalId}`)
                     .pipe(catchError(() => of(null))),
      cases:     this.http.get<any>(`${BASE_URL}/cases`)
                     .pipe(catchError(() => of([]))),
      users:     this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`)
                     .pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ analytics, cases, users }) => {
        this.isLoading = false;

        const allCases = Array.isArray(cases) ? cases : (cases?.items ?? []);
        const activeParamedics = (users as any[])
          .filter(u => (u.roleId === 3 || u.roleName === 'Paramedic') && u.status === 'Active')
          .length;

        this.computeFromCases(allCases, activeParamedics);

        if (analytics) {
          this.assessmentTime = {
            labels: ['Week 1','Week 2','Week 3','Week 4'],
            actual: [12, 9, 8.7, 10],
            target: [10, 10, 10, 10],
          };
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMsg  = 'Failed to load analytics data.';
      }
    });
  }

  applyFilters(): void {
    if (!this.reportType) return;
    const filtered = this.getMockData(this.reportType);
    this.dailyCaseVolume   = filtered.dailyCaseVolume;
    this.assessmentTime    = filtered.assessmentTime;
    this.hourlyCases       = filtered.hourlyCases;
    this.criticalDiagnosis = filtered.criticalDiagnosis;
    this.severity          = filtered.severity;
    this.webCardItems[0].num            = String(filtered.kpi.casesThisWeek);
    this.webCardItems[0].cardSeparators = filtered.kpi.casesChangePercent;
    this.webCardItems[1].num            = String(filtered.kpi.activeParamedics);
    this.webCardItems[2].num            = filtered.kpi.avgAssessmentTime;
    this.webCardItems[2].text           = filtered.kpi.avgAssessmentChange;
    this.webCardItems[3].num            = filtered.kpi.successRate;
    this.webCardItems[3].text           = filtered.kpi.successRateChange;
  }

  private getMockData(type: string): AnalyticsApiResponse {
    const mockData: Record<string, AnalyticsApiResponse> = {
      weekly: {
        kpi: {
          casesThisWeek: 24, casesChangePercent: '+12%',
          activeParamedics: 5, avgAssessmentTime: '8.7m',
          avgAssessmentChange: '↓ 5% faster',
          successRate: '94%', successRateChange: '↑ 3% from last month'
        },
        dailyCaseVolume: {
          labels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          actual:  [5, 8, 6, 7, 9, 3, 2],
          average: [6, 6, 6, 6, 6, 6, 6],
        },
        assessmentTime: {
          labels: ['Week 1','Week 2','Week 3','Week 4'],
          actual: [12, 9, 8.7, 10],
          target: [10, 10, 10, 10],
        },
        hourlyCases: {
          labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
          data:   [1, 2, 6, 8, 5, 3],
        },
        criticalDiagnosis: {
          labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          data:   [88, 90, 91, 89, 93, 94, 92],
        },
        severity: { mild: 3, moderate: 5, severe: 2 },
      },
      monthly: {
        kpi: {
          casesThisWeek: 98, casesChangePercent: '+8%',
          activeParamedics: 7, avgAssessmentTime: '9.2m',
          avgAssessmentChange: '↓ 3% faster',
          successRate: '91%', successRateChange: '↑ 1% from last month'
        },
        dailyCaseVolume: {
          labels:  ['Week 1','Week 2','Week 3','Week 4'],
          actual:  [22, 28, 24, 24],
          average: [25, 25, 25, 25],
        },
        assessmentTime: {
          labels: ['Week 1','Week 2','Week 3','Week 4'],
          actual: [10, 9.5, 9.2, 9.8],
          target: [9, 9, 9, 9],
        },
        hourlyCases: {
          labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
          data:   [3, 5, 18, 28, 22, 12],
        },
        criticalDiagnosis: {
          labels: ['Week 1','Week 2','Week 3','Week 4'],
          data:   [87, 89, 91, 90],
        },
        severity: { mild: 40, moderate: 38, severe: 20 },
      },
      quarterly: {
        kpi: {
          casesThisWeek: 310, casesChangePercent: '+15%',
          activeParamedics: 8, avgAssessmentTime: '8.1m',
          avgAssessmentChange: '↓ 8% faster',
          successRate: '96%', successRateChange: '↑ 5% from last quarter'
        },
        dailyCaseVolume: {
          labels:  ['Jan','Feb','Mar'],
          actual:  [95, 105, 110],
          average: [100, 100, 100],
        },
        assessmentTime: {
          labels: ['Jan','Feb','Mar'],
          actual: [9, 8.5, 8.1],
          target: [9, 9, 9],
        },
        hourlyCases: {
          labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
          data:   [8, 15, 55, 82, 68, 35],
        },
        criticalDiagnosis: {
          labels: ['Jan','Feb','Mar'],
          data:   [90, 93, 96],
        },
        severity: { mild: 120, moderate: 110, severe: 80 },
      },
    };
    return mockData[type] ?? mockData['weekly'];
  }

  generatePDF(): void {
    if (!this.reportType) {
      this.errorMsg = 'Please select a report type';
      return;
    }
    this.errorMsg = '';
    console.log('Generate PDF:', this.reportType, this.dateFrom, this.dateTo);
    alert(`Generating ${this.reportType} PDF from ${this.dateFrom} to ${this.dateTo}`);
  }
}