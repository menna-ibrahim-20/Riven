import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WebCardAnalyticsComponent } from '../web-card-analytics/web-card-analytics.component';
import { WebCasesCard3AnalyticsComponent } from '../web-cases-card3-analytics/web-cases-card3-analytics.component';
import { WebCasesCard4AnalyticsComponent } from '../web-cases-card4-analytics/web-cases-card4-analytics.component';
import { WebCasesCard5AnalyticsComponent } from '../web-cases-card5-analytics/web-cases-card5-analytics.component';
import { WebCasesCard6AnalyticsComponent } from '../web-cases-card6-analytics/web-cases-card6-analytics.component';
import { WebCasesCard7AnalyticsComponent } from '../web-cases-card7-analytics/web-cases-card7-analytics.component';
import { WebCasesCard8AnalyticsComponent } from '../web-cases-card8-analytics/web-cases-card8-analytics.component';
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';



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
  imports: [  CommonModule,
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

  webCardItems = [
    {
      cardSeparators: '+12%',
      text: 'Cases This Week',
      num: '24',
      iconTypeBackgroundColor: '#e8f0fe',
      casesThisWeekColor: '#0fa573',
    },
    {
      cardSeparators: 'Active Paramedics',
      text: 'Online now',
      num: '5',
      iconTypeBackgroundColor: '#e6f7f2',
      casesThisWeekColor: '#0fa573',
    },
    {
      cardSeparators: 'Avg Assessment Time',
      text: '↓ 5% faster',
      num: '8.7m',
      iconTypeBackgroundColor: '#fff7e6',
      casesThisWeekColor: '#0fa573',
    },
    {
      cardSeparators: 'Success Rate',
      text: '↑ 3% from last month',
      num: '94%',
      iconTypeBackgroundColor: '#e6f7f2',
      casesThisWeekColor: '#0fa573',
    },
  ];

  dailyCaseVolume: ChartSeriesData = {
    labels:  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    actual:  [5, 8, 6, 7, 9, 3, 2],
    average: [6, 6, 6, 6, 6, 6, 6],
  };

  assessmentTime: ChartSeriesData = {
    labels: ['Week 1','Week 2','Week 3','Week 4'],
    actual: [12, 9, 8.7, 10],
    target: [10, 10, 10, 10],
  };

  hourlyCases: HourlyData = {
    labels: ['00-04','04-08','08-12','12-16','16-20','20-24'],
    data:   [1, 2, 6, 8, 5, 3],
  };

  criticalDiagnosis: HourlyData = {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    data:   [88, 90, 91, 89, 93, 94],
  };

  severity: SeverityData = { mild: 1, moderate: 2, severe: 3 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const today    = new Date();
    const monthAgo = new Date(Date.now() - 30 * 86400000);
    this.dateTo   = today.toISOString().split('T')[0];
    this.dateFrom = monthAgo.toISOString().split('T')[0];
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
    this.errorMsg = 'اختار نوع التقرير';
    return;
  }
  this.errorMsg = '';
  // TODO: لما يجهز الـ API اشيل الـ comment ده
  // this.isLoading = true;
  // const params = new HttpParams()
  //   .set('type', this.reportType)
  //   .set('from', this.dateFrom)
  //   .set('to',   this.dateTo);
  // this.http.get<AnalyticsApiResponse>('/api/analytics', { params })
  //   .subscribe({
  //     next: (res) => { this.isLoading = false; this.applyResponse(res); },
  //     error: () => {
  //       this.isLoading = false;
  //       this.errorMsg  = 'فيه خطأ في تحميل البيانات، حاول تاني.';
  //     }
  //   });
  console.log('Generate PDF:', this.reportType, this.dateFrom, this.dateTo);
  alert(`Generating ${this.reportType} PDF from ${this.dateFrom} to ${this.dateTo}`);
}

  private applyResponse(res: AnalyticsApiResponse): void {
    if (res.kpi) {
      this.webCardItems[0].num            = String(res.kpi.casesThisWeek);
      this.webCardItems[0].cardSeparators = res.kpi.casesChangePercent;
      this.webCardItems[1].num            = String(res.kpi.activeParamedics);
      this.webCardItems[2].num            = res.kpi.avgAssessmentTime;
      this.webCardItems[2].text           = res.kpi.avgAssessmentChange;
      this.webCardItems[3].num            = res.kpi.successRate;
      this.webCardItems[3].text           = res.kpi.successRateChange;
    }
    if (res.dailyCaseVolume)   this.dailyCaseVolume   = res.dailyCaseVolume;
    if (res.assessmentTime)    this.assessmentTime    = res.assessmentTime;
    if (res.hourlyCases)       this.hourlyCases       = res.hourlyCases;
    if (res.criticalDiagnosis) this.criticalDiagnosis = res.criticalDiagnosis;
    if (res.severity)          this.severity          = res.severity;
  }
}