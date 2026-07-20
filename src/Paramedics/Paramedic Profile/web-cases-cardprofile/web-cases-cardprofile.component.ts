import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, HostBinding
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, forkJoin, takeUntil, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart, registerables } from 'chart.js';
import { TimeCasesprofileComponent }  from '../time-casesprofile/time-casesprofile.component';
import { CardMComponent }              from '../card-m/card-m.component';
import { Direction1profileComponent }  from '../direction1profile/direction1profile.component';
import { DeleteComponent }             from '../delete/delete.component';
import { WebCasesCardAddComponent }    from '../../Add Paramedics/web-cases-card-add/web-cases-card-add.component';
import { inject } from '@angular/core';
import { AuthService } from '../../../auth/services/services';
Chart.register(...registerables);

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

export interface ParamedicProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  ambulance: string;
  ambulanceId?: number;
  Paramedicimg?: string;
}

export interface ParamedicStats {
  totalCases:     number;
  casesTrend:     string;
  avgResponse:    string;
  responseTrend:  string;
  handovers:      number;
  handoverSub:    string;
  completionRate: string;
  completionSub:  string;
}

export interface ParamedicCharts {
  casesOverTime:     { labels: string[]; data: number[] };
  responseTimeTrend: { labels: string[]; data: number[] };
}

export interface CaseType {
  label: string;
  pct:   number;
  color: string;
}

const EMPTY_STATS: ParamedicStats = {
  totalCases:     0,
  casesTrend:     '—',
  avgResponse:    '—',
  responseTrend:  '—',
  handovers:      0,
  handoverSub:    'Completed transfers',
  completionRate: '—',
  completionSub:  'Cases assessments',
};

const EMPTY_CHARTS: ParamedicCharts = {
  casesOverTime:     { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], data: [0,0,0,0,0,0,0] },
  responseTimeTrend: { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], data: [0,0,0,0,0,0,0] },
};

const PALETTE = ['#2f80ed', '#d64545', '#7c5cff', '#0fa573', '#d4860a'];

@Component({
  selector:    'app-web-cases-cardprofile',
  standalone:  true,
  imports: [
    CommonModule,
    TimeCasesprofileComponent,
    CardMComponent,
    Direction1profileComponent,
    DeleteComponent,
    WebCasesCardAddComponent,
  ],
  templateUrl: './web-cases-cardprofile.component.html',
  styleUrl:    './web-cases-cardprofile.component.css',
})
export class WebCasesCardprofileComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('style.display') display = 'contents';

  @ViewChild('casesChart')    casesRef!:    ElementRef<HTMLCanvasElement>;
  @ViewChild('responseChart') responseRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart')    donutRef!:    ElementRef<HTMLCanvasElement>;

  isLoading    = true;
  statsLoading = false;
  hasError     = false;
  paramedicId  = '';

  paramedic:  ParamedicProfile = { id: '', name: '', email: '', phone: '', ambulance: '' };
  stats:      ParamedicStats   = { ...EMPTY_STATS };
  chartData:  ParamedicCharts  = { ...EMPTY_CHARTS };
  caseTypes:  CaseType[]       = [];

  activeTab: 'today' | 'week' | 'month' = 'today';

  showDeleteModal = false;
  isDeleting      = false;
  showEditModal   = false;

  private casesChart?:    Chart;
  private responseChart?: Chart;
  private donutChart?:    Chart;
  private chartsReady = false;
  private destroy$    = new Subject<void>();

  private get numericId(): number {
    return parseInt(this.paramedicId.replace(/\D/g, ''), 10);
  }

private authService = inject(AuthService);

private get hospitalId(): number {
  return this.authService.getHospitalId() ?? 0;
}

  constructor(
    private route:    ActivatedRoute,
    private router:   Router,
    private location: Location,
    private http:     HttpClient,
  ) {}

  ngOnInit(): void {
    this.paramedicId = this.route.snapshot.paramMap.get('id') || '';
    this.loadAll();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.casesChart?.destroy();
    this.responseChart?.destroy();
    this.donutChart?.destroy();
  }

  loadAll(): void {
    this.isLoading = true;
    this.hasError  = false;

    if (!this.hospitalId) {
      this.isLoading = false;
      return;
    }

    forkJoin({
      profile:    this.http.get<any>(`${BASE_URL}/users/${this.numericId}`)
                           .pipe(catchError(() => of(null))),
      allCases:   this.http.get<any>(`${BASE_URL}/Cases/hospital/${this.hospitalId}`)
                           .pipe(catchError(() => of([]))),
      ambulances: this.http.get<any[]>(`${BASE_URL}/ambulances/hospital/${this.hospitalId}`)
                           .pipe(catchError(() => of([]))),
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ({ profile, allCases, ambulances }) => {

        // ── Profile ──
        if (profile) {
          const amb = ambulances.find((a: any) => a.ambulanceId === profile.ambulanceId);
          this.paramedic = {
            id:           `PM-${String(profile.userId).padStart(3, '0')}`,
            name:         profile.fullName ?? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim(),
            email:        profile.email       ?? '',
            phone:        profile.phoneNumber ?? '',
            ambulance:    amb?.vehicleNumber ?? (profile.ambulanceId ? `AMB-${String(profile.ambulanceId).padStart(3,'0')}` : '—'),
            ambulanceId:  profile.ambulanceId ?? undefined,
            Paramedicimg: profile.profilePicture ?? undefined,
          };
        } else {
          this.hasError = true;
        }

        // ── Filter cases for this paramedic ──
        const rawCases = Array.isArray(allCases)
          ? allCases
          : (allCases?.items ?? []);

        const userCases = rawCases.filter((c: any) => c.userId === this.numericId);
        this.computeStats(userCases);
        this.computeCharts(userCases, this.activeTab);

        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 0);
      },
      error: () => {
        this.hasError  = true;
        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 0);
      },
    });
  }

  // ── Compute stats from cases ──
  private computeStats(cases: any[]): void {
    const total     = cases.length;
    const handovers = cases.filter(c => c.status === 'Handover' || c.status === 'Completed').length;

    const timeDiffs = cases
      .filter(c => c.onsetTime && c.handoverTime)
      .map(c => (new Date(c.handoverTime).getTime() - new Date(c.onsetTime).getTime()) / 60000)
      .filter(d => d > 0 && d < 1440);

    const avgMin    = timeDiffs.length > 0
      ? Math.round(timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length)
      : 0;
    const avgResponse = avgMin > 0 ? `${avgMin}m` : '—';

    const completionRate = total > 0
      ? `${Math.round((handovers / total) * 100)}%`
      : '—';

    // ── Case Type Breakdown ──
    const severityCount: Record<string, number> = {};
    cases.forEach(c => {
      const s = c.severity ?? 'Unknown';
      severityCount[s] = (severityCount[s] ?? 0) + 1;
    });
    this.caseTypes = Object.entries(severityCount).map(([label, count], i) => ({
      label,
      pct:   total > 0 ? Math.round((count / total) * 100) : 0,
      color: PALETTE[i % PALETTE.length],
    }));

    this.stats = {
      totalCases:     total,
      casesTrend:     total > 0 ? `${total} total cases` : '—',
      avgResponse,
      responseTrend:  avgMin > 0 ? `${avgMin}m avg` : '—',
      handovers,
      handoverSub:    'Completed transfers',
      completionRate,
      completionSub:  'Cases assessments',
    };
  }

  // ── Compute chart data from cases ──
  private computeCharts(cases: any[], period: string): void {
    const days    = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const weeks   = ['Week 1','Week 2','Week 3','Week 4'];
    const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const now = new Date();

    if (period === 'today' || period === 'week') {
      // group by day of week
      const dayCounts  = Array(7).fill(0);
      const dayTimeDiffs: number[][] = Array.from({ length: 7 }, () => []);

      cases.forEach(c => {
        const d = new Date(c.caseDate ?? c.createdAt ?? '');
        const dayIndex = (d.getDay() + 6) % 7; // Mon=0
        dayCounts[dayIndex]++;
        if (c.onsetTime && c.handoverTime) {
          const diff = (new Date(c.handoverTime).getTime() - new Date(c.onsetTime).getTime()) / 60000;
          if (diff > 0 && diff < 1440) dayTimeDiffs[dayIndex].push(diff);
        }
      });

      this.chartData = {
        casesOverTime: { labels: days, data: dayCounts },
        responseTimeTrend: {
          labels: days,
          data: dayTimeDiffs.map(arr =>
            arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0
          ),
        },
      };

    } else if (period === 'month') {
      // group by week of month
      const weekCounts: number[]    = [0, 0, 0, 0];
      const weekDiffs: number[][]   = [[], [], [], []];

      cases.forEach(c => {
        const d = new Date(c.caseDate ?? c.createdAt ?? '');
        const weekIndex = Math.min(Math.floor((d.getDate() - 1) / 7), 3);
        weekCounts[weekIndex]++;
        if (c.onsetTime && c.handoverTime) {
          const diff = (new Date(c.handoverTime).getTime() - new Date(c.onsetTime).getTime()) / 60000;
          if (diff > 0 && diff < 1440) weekDiffs[weekIndex].push(diff);
        }
      });

      this.chartData = {
        casesOverTime: { labels: weeks, data: weekCounts },
        responseTimeTrend: {
          labels: weeks,
          data: weekDiffs.map(arr =>
            arr.length > 0 ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0
          ),
        },
      };
    }
  }

  // ── Tab change ──
  setTab(tab: string): void {
    this.activeTab    = tab as 'today' | 'week' | 'month';
    this.statsLoading = true;

    const rawCases = (this as any)._cachedCases ?? [];
    this.computeCharts(rawCases, tab);
    this.statsLoading = false;
    this.updateCharts();
  }

  // ── Actions ──
  loadProfile(): void { this.loadAll(); }
  goBack(): void { this.location.back(); }
  onEdit(): void { this.showEditModal = true; }

  onParamedicUpdated(updated: any): void {
    this.paramedic = {
      ...this.paramedic,
      name:      updated.name      || this.paramedic.name,
      email:     updated.email     || this.paramedic.email,
      phone:     updated.phone     || this.paramedic.phone,
      ambulance: updated.ambulance || this.paramedic.ambulance,
    };
    this.showEditModal = false;
    this.loadAll();
  }

  confirmDelete(): void {
    this.isDeleting = true;
    this.http.delete(`${BASE_URL}/users/${this.numericId}`)
      .pipe(takeUntil(this.destroy$), catchError(() => of(null)))
      .subscribe(() => {
        this.isDeleting = false;
        this.router.navigate(['/dashboard/paramedic']);
      });
  }

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).src = 'assets/img/Frame 467.png';
  }

  // ── Charts ──
  private buildCharts(): void {
    if (this.chartsReady) { this.updateCharts(); return; }
    this.chartsReady = true;

    this.casesChart = new Chart(this.casesRef.nativeElement, {
      type: 'bar',
      data: {
        labels:   this.chartData.casesOverTime.labels,
        datasets: [{
          label:           'Cases',
          data:            this.chartData.casesOverTime.data,
          backgroundColor: '#0aa3b2',
          borderRadius:    8,
          barPercentage:   0.55,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 }, stepSize: 1 }, beginAtZero: true, min: 0, suggestedMax: 5 },
        },
      },
    });

    this.responseChart = new Chart(this.responseRef.nativeElement, {
      type: 'line',
      data: {
        labels:   this.chartData.responseTimeTrend.labels,
        datasets: [{
          label:                'Avg Response (min)',
          data:                 this.chartData.responseTimeTrend.data,
          borderColor:          '#08848d',
          backgroundColor:      'rgba(8,132,141,0.08)',
          fill:                 true,
          tension:              0.4,
          pointRadius:          5,
          pointBackgroundColor: '#08848d',
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } }, beginAtZero: true, min: 0, suggestedMax: 30 },
        },
      },
    });

    this.donutChart = new Chart(this.donutRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels:   this.caseTypes.map(c => c.label),
        datasets: [{
          data:            this.caseTypes.length > 0 ? this.caseTypes.map(c => c.pct) : [1],
          backgroundColor: this.caseTypes.length > 0 ? this.caseTypes.map(c => c.color) : ['#e5e7eb'],
          borderWidth:     0,
          hoverOffset:     6,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        cutout:              '68%',
        plugins: { legend: { display: false } },
      },
    });
  }

  private updateCharts(): void {
    if (!this.casesChart || !this.responseChart || !this.donutChart) return;

    this.casesChart.data.labels           = this.chartData.casesOverTime.labels;
    this.casesChart.data.datasets[0].data = this.chartData.casesOverTime.data;
    this.casesChart.update();

    this.responseChart.data.labels           = this.chartData.responseTimeTrend.labels;
    this.responseChart.data.datasets[0].data = this.chartData.responseTimeTrend.data;
    this.responseChart.update();

    this.donutChart.data.labels                      = this.caseTypes.map(c => c.label);
    this.donutChart.data.datasets[0].data            = this.caseTypes.length > 0 ? this.caseTypes.map(c => c.pct) : [1];
    this.donutChart.data.datasets[0].backgroundColor = this.caseTypes.length > 0 ? this.caseTypes.map(c => c.color) : ['#e5e7eb'];
    this.donutChart.update();
  }
}