import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// ══════════════════════════════════════════════
//  لما يجهز الـ backend:
//  1. غيري USE_MOCK = false
//  2. حطي الـ BASE_URL الصحيح
// ══════════════════════════════════════════════
const USE_MOCK = true;
const BASE_URL = 'https://your-api.com/api';

export interface OverviewItem {
  separatorB: string;
  text: string;
  num: string;
  homeDirectionBackgroundColor: string;
  home: string;
  homeIconHeight?: string;
  homeIconMaxHeight?: string;
  separatorBColor: string;
  casesWeekColor?: string;
  casesThisWeekColor?: string;
}

export interface IncomingCase {
  id: string;
  patient: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  eta: string;
  aiPrediction: string;
  nihss: string;
  onset: string;
  paramedic: string;
  updatedAt: string;
}

export interface HandoverCase {
  id: string;
  patient: string;
  severity: 'Severe' | 'Moderate' | 'Mild';
  timeInHospital: string;
  aiPrediction: string;
  nihss: string;
  physician: string;
  paramedic: string;
  updatedAt: string;
}

const MOCK_OVERVIEW: OverviewItem[] = [
  {
    separatorB: '+12%', text: 'Cases This Week', num: '24',
    homeDirectionBackgroundColor: '#e8f1ff', home: '/assets/Home.svg',
    homeIconHeight: '24px', separatorBColor: '#0fa573',
    casesWeekColor: '#1a1d1f', casesThisWeekColor: '#4a4f52',
  },
  {
    separatorB: 'Live', text: 'En Route', num: '2',
    homeDirectionBackgroundColor: '#fdeaea', home: '/assets/Direction.svg',
    separatorBColor: '#d64545', casesWeekColor: '#d64545',
  },
  {
    separatorB: 'Active Paramedics', text: 'Online now', num: '5',
    homeDirectionBackgroundColor: '#e6f7f2', home: '/assets/Language.svg',
    separatorBColor: '#4a4f52', casesThisWeekColor: '#0fa573',
  },
  {
    separatorB: 'ER Ready', text: 'Available Stroke Beds', num: '4',
    homeDirectionBackgroundColor: '#e6f7f2', home: '/assets/Bed.svg',
    homeIconHeight: 'unset', homeIconMaxHeight: '100%', separatorBColor: '#4a4f52',
  },
];

const MOCK_INCOMING: IncomingCase[] = [
  {
    id: 'SC-2024-001', patient: '67yo Male', severity: 'Severe', eta: '8 min',
    aiPrediction: 'Ischemic - Large Vessel Occlusion', nihss: '26 (Severe Stroke)',
    onset: '30 min ago', paramedic: 'Davis Adam', updatedAt: '2 min ago',
  },
  {
    id: 'SC-2024-002', patient: '54yo Female', severity: 'Moderate', eta: '12 min',
    aiPrediction: 'Hemorrhagic Stroke', nihss: '14 (Moderate)',
    onset: '45 min ago', paramedic: 'Sarah Lee', updatedAt: '5 min ago',
  },
];

const MOCK_HANDOVER: HandoverCase[] = [
  {
    id: 'SC-2024-001', patient: '67yo Male', severity: 'Severe',
    timeInHospital: '18 min ago', aiPrediction: 'Ischemic - Large Vessel Occlusion',
    nihss: '26 (Severe Stroke)', physician: 'Dr. James Wilson',
    paramedic: 'Davis Adam', updatedAt: '2 min ago',
  },
  {
    id: 'SC-2024-003', patient: '71yo Male', severity: 'Severe',
    timeInHospital: '42 min ago', aiPrediction: 'Ischemic - Cardioembolic',
    nihss: '18 (Moderate-Severe)', physician: 'Dr. Sarah Chen',
    paramedic: 'Mark Evans', updatedAt: '8 min ago',
  },
];

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<OverviewItem[]> {
    if (USE_MOCK) return of(MOCK_OVERVIEW);
    return this.http.get<OverviewItem[]>(`${BASE_URL}/overview`)
      .pipe(catchError(() => of(MOCK_OVERVIEW)));
  }

  getIncomingCases(): Observable<IncomingCase[]> {
    if (USE_MOCK) return of(MOCK_INCOMING);
    return this.http.get<IncomingCase[]>(`${BASE_URL}/cases/incoming`)
      .pipe(catchError(() => of(MOCK_INCOMING)));
  }

  getHandoverCases(): Observable<HandoverCase[]> {
    if (USE_MOCK) return of(MOCK_HANDOVER);
    return this.http.get<HandoverCase[]>(`${BASE_URL}/cases/handover`)
      .pipe(catchError(() => of(MOCK_HANDOVER)));
  }
}