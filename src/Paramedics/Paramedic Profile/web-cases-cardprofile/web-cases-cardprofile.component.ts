import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ViewChild, ElementRef, HostBinding
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, forkJoin, takeUntil, of, catchError } from 'rxjs';
import { Chart, registerables } from 'chart.js';
import { TimeCasesprofileComponent } from '../time-casesprofile/time-casesprofile.component';
import { CardMComponent } from '../card-m/card-m.component';
import { Direction1profileComponent } from '../direction1profile/direction1profile.component';
import { DeleteComponent } from '../delete/delete.component';
import { WebCasesCardAddComponent } from '../../Add Paramedics/web-cases-card-add/web-cases-card-add.component';


Chart.register(...registerables);

// ══ Interfaces ══
export interface ParamedicProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  ambulance: string;
  Paramedicimg?: string;
}

export interface ParamedicStats {
  totalCases: number;
  casesTrend: string;
  avgResponse: string;
  responseTrend: string;
  handovers: number;
  handoverSub: string;
  completionRate: string;
  completionSub: string;
}

export interface ParamedicCharts {
  casesOverTime: { labels: string[]; data: number[] };
  responseTimeTrend: { labels: string[]; data: number[] };
}

export interface CaseType {
  label: string;
  pct: number;
  color: string;
}

// ══ Sample Data ══
const SAMPLE_PROFILE: ParamedicProfile = {
  id: 'PM-001',
  name: 'Davis Adam',
  email: 'davis.adam@cityambulance.org',
  phone: '+1 (555) 123-4567',
  ambulance: 'AMB-045',
 Paramedicimg:'../../../assets/img/OIP.webp',
};

const SAMPLE_STATS: Record<string, ParamedicStats> = {
  today: {
    totalCases: 8,
    casesTrend: '12% vs last period',
    avgResponse: '17m',
    responseTrend: '12% faster',
    handovers: 17,
    handoverSub: 'Completed transfers',
    completionRate: '94%',
    completionSub: 'Cases assessments',
  },
  week: {
    totalCases: 42,
    casesTrend: '8% vs last week',
    avgResponse: '15m',
    responseTrend: '5% faster',
    handovers: 38,
    handoverSub: 'Completed transfers',
    completionRate: '91%',
    completionSub: 'Cases assessments',
  },
  month: {
    totalCases: 156,
    casesTrend: '15% vs last month',
    avgResponse: '16m',
    responseTrend: '10% faster',
    handovers: 140,
    handoverSub: 'Completed transfers',
    completionRate: '93%',
    completionSub: 'Cases assessments',
  },
};

const SAMPLE_CHARTS: Record<string, ParamedicCharts> = {
  today: {
    casesOverTime: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [1, 4, 3, 5, 4, 1, 2],
    },
    responseTimeTrend: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [18, 17, 16, 15, 16, 14, 13],
    },
  },
  week: {
    casesOverTime: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [10, 12, 8, 12],
    },
    responseTimeTrend: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      data: [17, 16, 15, 15],
    },
  },
  month: {
    casesOverTime: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [20, 28, 25, 30, 27, 26],
    },
    responseTimeTrend: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      data: [19, 18, 17, 16, 16, 15],
    },
  },
};

const SAMPLE_CASE_TYPES: CaseType[] = [
  { label: 'Ischemic Suspected',    pct: 45, color: '#2f80ed' },
  { label: 'Hemorrhagic Suspected', pct: 30, color: '#d64545' },
  { label: 'Other Neurological',    pct: 25, color: '#7c5cff' },
];

const API_BASE = 'http://localhost:3000/api/v1'; // ← غير ده للـ URL بتاعك
const USE_MOCK = true; // ← غيره لـ false لما يجهز الـ API

@Component({
  selector: 'app-web-cases-cardprofile',
  standalone: true,
  imports: [  CommonModule,
    TimeCasesprofileComponent,
    CardMComponent,
    Direction1profileComponent,
    DeleteComponent,WebCasesCardAddComponent],
  templateUrl: './web-cases-cardprofile.component.html',
  styleUrl: './web-cases-cardprofile.component.css'
})

export class WebCasesCardprofileComponent implements OnInit, AfterViewInit, OnDestroy {

  @HostBinding('style.display') display = 'contents';

  @ViewChild('casesChart')    casesRef!:    ElementRef<HTMLCanvasElement>;
  @ViewChild('responseChart') responseRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('donutChart')    donutRef!:    ElementRef<HTMLCanvasElement>;

  // ── State ──
  isLoading    = true;
  statsLoading = false;
  hasError     = false;
  paramedicId  = '';

  paramedic:  ParamedicProfile = SAMPLE_PROFILE;
  stats:      ParamedicStats   = SAMPLE_STATS['today'];
  chartData:  ParamedicCharts  = SAMPLE_CHARTS['today'];
  caseTypes:  CaseType[]       = SAMPLE_CASE_TYPES;

  activeTab: 'today' | 'week' | 'month' = 'today';

  showDeleteModal = false;
  isDeleting      = false;
  showEditModal = false;



  private casesChart?:    Chart;
  private responseChart?: Chart;
  private donutChart?:    Chart;
  private chartsReady = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route:    ActivatedRoute,
    private router:   Router,
    private location: Location,
    private http:     HttpClient,
  ) {}

  ngOnInit(): void {
    this.paramedicId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProfile();
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.casesChart?.destroy();
    this.responseChart?.destroy();
    this.donutChart?.destroy();
  }

  // ══ Load Profile ══
  loadProfile(): void {
    this.isLoading = true;
    this.hasError  = false;

    if (USE_MOCK) {
      setTimeout(() => {
        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 0);
      }, 500);
      return;
    }

    forkJoin({
      profile: this.http.get<any>(`${API_BASE}/paramedics/${this.paramedicId}`)
        .pipe(catchError(() => of(null))),
      stats: this.http.get<any>(
        `${API_BASE}/paramedics/${this.paramedicId}/stats?period=${this.activeTab}`)
        .pipe(catchError(() => of(null))),
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: ({ profile, stats }) => {
        if (profile) this.paramedic = this.mapProfile(profile);
        else         this.hasError  = true;
        if (stats) {
          this.stats     = this.mapStats(stats);
          this.chartData = this.mapCharts(stats);
          this.caseTypes = this.mapCaseTypes(stats);
        }
        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 0);
      },
      error: () => {
        this.hasError  = true;
        this.isLoading = false;
        setTimeout(() => this.buildCharts(), 0);
      }
    });
  }

  // ══ Tab Change ══
  setTab(tab: string): void {
    this.activeTab    = tab as 'today' | 'week' | 'month';
    this.statsLoading = true;

    if (USE_MOCK) {
      setTimeout(() => {
        this.stats        = SAMPLE_STATS[tab];
        this.chartData    = SAMPLE_CHARTS[tab];
        this.statsLoading = false;
        this.updateCharts();
      }, 300);
      return;
    }

    this.http.get<any>(
      `${API_BASE}/paramedics/${this.paramedicId}/stats?period=${tab}`)
      .pipe(takeUntil(this.destroy$), catchError(() => of(null)))
      .subscribe(res => {
        if (res) {
          this.stats     = this.mapStats(res);
          this.chartData = this.mapCharts(res);
          this.caseTypes = this.mapCaseTypes(res);
          this.updateCharts();
        }
        this.statsLoading = false;
      });
  }


  // ══ Mappers ══
  private mapProfile(r: any): ParamedicProfile {
    return {
      id:        r.id        ?? '',
      name:      r.name      ?? '',
      email:     r.email     ?? '',
      phone:     r.phone     ?? '',
      ambulance: r.ambulance ?? '—',
      Paramedicimg:    r.Paramedicimg    ?? undefined,
    };
  }

  private mapStats(r: any): ParamedicStats {
    const s = r.stats ?? r;
    return {
      totalCases:     s.total_cases     ?? 0,
      casesTrend:     s.cases_trend     ?? '',
      avgResponse:    s.avg_response    ?? '—',
      responseTrend:  s.response_trend  ?? '',
      handovers:      s.handovers       ?? 0,
      handoverSub:    s.handover_sub    ?? 'Completed transfers',
      completionRate: s.completion_rate ?? '—',
      completionSub:  s.completion_sub  ?? 'Cases assessments',
    };
  }

  private mapCharts(r: any): ParamedicCharts {
    const c = r.charts ?? r;
    return {
      casesOverTime: {
        labels: c.cases_labels ?? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        data:   c.cases_data   ?? [0,0,0,0,0,0,0],
      },
      responseTimeTrend: {
        labels: c.response_labels ?? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        data:   c.response_data   ?? [0,0,0,0,0,0,0],
      },
    };
  }

  private mapCaseTypes(r: any): CaseType[] {
    const raw: any[] = r.case_types ?? [];
    if (!raw.length) return SAMPLE_CASE_TYPES;
    const colors = ['#2f80ed', '#d64545', '#7c5cff', '#0fa573', '#f59e0b'];
    return raw.map((item, i) => ({
      label: item.label ?? '',
      pct:   item.pct   ?? 0,
      color: item.color ?? colors[i % colors.length],
    }));
  }

  // ══ Charts ══
  private buildCharts(): void {
    if (this.chartsReady) { this.updateCharts(); return; }
    this.chartsReady = true;

    this.casesChart = new Chart(this.casesRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartData.casesOverTime.labels,
        datasets: [{
          label: 'Cases',
          data:  this.chartData.casesOverTime.data,
          backgroundColor: '#0aa3b2',
          borderRadius: 8,
          barPercentage: 0.55,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } }, beginAtZero: true },
        },
      },
    });

    this.responseChart = new Chart(this.responseRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.responseTimeTrend.labels,
        datasets: [{
          label: 'Avg Response (min)',
          data:  this.chartData.responseTimeTrend.data,
          borderColor: '#08848d',
          backgroundColor: 'rgba(8,132,141,0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 5,
          pointBackgroundColor: '#08848d',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
          y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#6e7477', font: { size: 11 } } },
        },
      },
    });

    this.donutChart = new Chart(this.donutRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels:   this.caseTypes.map(c => c.label),
        datasets: [{
          data:            this.caseTypes.map(c => c.pct),
          backgroundColor: this.caseTypes.map(c => c.color),
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
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

    this.donutChart.data.datasets[0].data            = this.caseTypes.map(c => c.pct);
    this.donutChart.data.datasets[0].backgroundColor = this.caseTypes.map(c => c.color);
    this.donutChart.update();
  }

  // ══ Actions ══
  goBack(): void { this.location.back(); }

 onEdit(): void {
  this.showEditModal = true;
}


onParamedicUpdated(updated: any): void {
  this.paramedic = {
    ...this.paramedic,
    name:      updated.name      || this.paramedic.name,
    email:     updated.email     || this.paramedic.email,
    phone:     updated.phone     || this.paramedic.phone,
    ambulance: updated.ambulance || this.paramedic.ambulance,
  };
  this.showEditModal = false;
}
  confirmDelete(): void {
    this.isDeleting = true;
    if (USE_MOCK) {
      setTimeout(() => this.router.navigate(['/dashboard/paramedic']), 700);
      return;
    }
    this.http.delete(`${API_BASE}/paramedics/${this.paramedicId}`)
      .pipe(takeUntil(this.destroy$), catchError(() => of(null)))
      .subscribe(() => this.router.navigate(['/dashboard/paramedic']));
  }

  onImgError(e: Event): void {
    (e.target as HTMLImageElement).src = 'assets/img/Frame 467.png';
  }
}