import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of, shareReplay } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const USE_MOCK = false;
const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

// ── INTERFACES ────────────────────────────────

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

export interface EcgResult {
  id: number;
  caseId: number;
  fileName: string;
  result: string;
  confidence: number;
  createdAt: string;
}

// ── NIHSS Interface ───────────────────────────

export interface NihssAssessmentDto {
  nihssId: number;
  caseId: number;
  domainScores: Record<string, number>;
  totalScore: number;
  severityLabel: string;
}

// ── INTERFACES للـ Backend responses ──────────

export interface CaseDto {
  caseId: number;
  patientId: number;
  userId: number;
  hospitalId: number;
  ambulanceId?: number;
  status: string;
  severity: string;
  onsetTime?: string;
  arrivedTime?: string;
  handoverTime?: string;
  caseDate: string;
  location?: string;
  receivingPhysician?: string;
  patientConditionOnArrival?: string;
  handoverNotes?: string;
}

export interface PatientDto {
  patientId: number;
  name: string;
  gender: string;
  age: number;
  registrationDate: string;
}

export interface AiReportDto {
  aiReportId: number;
  caseId: number;
  strokeType?: string;
  afDetectionStatus?: string;
  confidenceScore?: number;
  generationDate?: string;
  riskLevel?: string;
  nihssScore?: number;
  ecgImageResult?: string;
  ecgSignalResult?: string;
  ctScanResult?: string;
  additionalNotes?: string;
}

export interface VitalSignsDto {
  vitalId: number;
  caseId: number;
  spO2?: number;
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  temperature?: number;
  temperatureUnit?: string;
  respiratoryRate?: number;
  glucoseLevel?: number;
}

export interface CaseDetailDto {
  case: CaseDto;
  patient?: PatientDto;
  vitalSigns?: VitalSignsDto;
  nihssAssessment?: NihssAssessmentDto;
  aiReport?: AiReportDto;
}

// ── MOCK DATA ─────────────────────────────────

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

// ── HELPERS ───────────────────────────────────

const HANDOVER_STATUSES = ['Handover', 'Arrived', 'Completed'];

function isHandover(status: string): boolean {
  return HANDOVER_STATUSES.includes(status?.trim());
}

function formatCaseId(caseId: number): string {
  const year = new Date().getFullYear();
  return `SC-${year}-${String(caseId).padStart(3, '0')}`;
}

// ── DASHBOARD SERVICE ─────────────────────────

@Injectable({ providedIn: 'root' })
export class DashboardService {

  private get hospitalId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.hospitalId ?? 0;
  }

  private _detailsCache$: Observable<CaseDetailDto[]> | null = null;

  constructor(private http: HttpClient) {}

  clearCache(): void {
    this._detailsCache$ = null;
  }

  // ── Helpers ───────────────────────────────────

  private timeAgo(isoDate: string): string {
    const diff = Date.now() - new Date(isoDate).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1)    return 'Just now';
    if (mins < 60)   return `${mins} min ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)} hr ago`;
    return `${Math.floor(mins / 1440)} days ago`;
  }

  private normalizeSeverity(value: string): 'Severe' | 'Moderate' | 'Mild' {
    if (!value) return 'Mild';
    const v = value.toLowerCase();
    if (v.includes('severe'))   return 'Severe';
    if (v.includes('moderate')) return 'Moderate';
    return 'Mild';
  }

  private formatPatient(patient: PatientDto | null | undefined): string {
    if (!patient) return 'Unknown';
    const name   = patient.name   ?? 'Unknown';
    const age    = patient.age    ?? '?';
    const gender = patient.gender ?? '';
    return `${name} · ${age}yo ${gender}`.trim();
  }

  // ── Fetch all case details ─────────────────────

  private fetchAllDetails(): Observable<any[]> {
    if (this._detailsCache$) return this._detailsCache$;

    if (!this.hospitalId) {
      return of([]);
    }

    this._detailsCache$ = this.http
      .get<CaseDto[]>(`${BASE_URL}/Cases/hospital/${this.hospitalId}`)
      .pipe(
        switchMap(cases => {
          if (!cases || !cases.length) return of([]);
          console.log('RAW cases from backend:', cases);

          return forkJoin(
            cases.map(c =>
              this.http.get<CaseDetailDto>(`${BASE_URL}/Cases/${c.caseId}/detail`)
                .pipe(catchError(() => of(null)))
            )
          );
        }),
        map((details: any[]) => details.filter(d => d !== null)),
        switchMap((details: any[]) => {
          if (!details.length) return of([]);

          return forkJoin(
            details.map(d =>
              forkJoin({
                user: this.http.get<any>(`${BASE_URL}/Users/${d.case?.userId}`)
                  .pipe(catchError(() => of(null))),
                transport: this.http.get<any>(`${BASE_URL}/Transport/cases/${d.case?.caseId}/status`)
                  .pipe(catchError(() => of(null))),
              }).pipe(
                map(({ user, transport }) => ({
                  ...d,
                  _paramedic: user?.fullName ?? user?.name ?? user?.userName ?? `User #${d.case?.userId}`,
                  _eta: transport?.estimatedArrivalMinutes ?? null,
                }))
              )
            )
          );
        }),
        catchError(() => of([])),
        shareReplay(1)
      );

    return this._detailsCache$;
  }

  // ── Overview (Analytics) ─────────────────────

  getOverview(): Observable<OverviewItem[]> {
    if (USE_MOCK) return of(MOCK_OVERVIEW);
    if (!this.hospitalId) return of(MOCK_OVERVIEW);

    return this.http
      .get<any>(`${BASE_URL}/Cases/analytics/${this.hospitalId}`)
      .pipe(
        map(analytics => [
          {
            separatorB: `+${analytics.weeklyCases ?? 0}`,
            text: 'Cases This Week',
            num: String(analytics.weeklyCases ?? 0),
            homeDirectionBackgroundColor: '#e8f1ff',
            home: '/assets/Home.svg',
            homeIconHeight: '24px',
            separatorBColor: '#0fa573',
            casesWeekColor: '#1a1d1f',
            casesThisWeekColor: '#4a4f52',
          },
          {
            separatorB: 'Live',
            text: 'En Route',
            num: String(analytics.activeCases ?? 0),
            homeDirectionBackgroundColor: '#fdeaea',
            home: '/assets/Direction.svg',
            separatorBColor: '#d64545',
            casesWeekColor: '#d64545',
          },
          {
            separatorB: 'Pending',
            text: 'Pending Cases',
            num: String(analytics.pendingCases ?? 0),
            homeDirectionBackgroundColor: '#e6f7f2',
            home: '/assets/Language.svg',
            separatorBColor: '#4a4f52',
            casesThisWeekColor: '#0fa573',
          },
          {
            separatorB: 'Completed',
            text: 'Completed Cases',
            num: String(analytics.completedCases ?? 0),
            homeDirectionBackgroundColor: '#e6f7f2',
            home: '/assets/Bed.svg',
            homeIconHeight: 'unset',
            homeIconMaxHeight: '100%',
            separatorBColor: '#4a4f52',
          },
        ] as OverviewItem[]),
        catchError(() => of(MOCK_OVERVIEW))
      );
  }

  // ── Incoming Cases ───────────────────────────

  getIncomingCases(): Observable<IncomingCase[]> {
    if (USE_MOCK) return of(MOCK_INCOMING);

    return this.fetchAllDetails().pipe(
      map(details => {
        console.log('All statuses:', details.map((d: any) => d.case?.status));
        return details
          .filter((d: any) => !isHandover(d.case?.status))
          .map((d: any) => ({
            id:           formatCaseId(d.case.caseId),
            patient:      this.formatPatient(d.patient),
            severity:     this.normalizeSeverity(d.case.severity),
            eta:          d.case.arrivedTime
                            ? 'Arrived'
                            : d._eta != null
                              ? `${d._eta} min`
                              : 'En Route',
            aiPrediction: d.aiReport?.strokeType ?? 'Pending',
            nihss:        `${d.nihssAssessment?.totalScore ?? '?'} (${d.nihssAssessment?.severityLabel ?? 'N/A'})`,
            onset:        d.case.onsetTime ? this.timeAgo(d.case.onsetTime) : 'Unknown',
            paramedic:    d._paramedic ?? 'N/A',
            updatedAt:    d.case.caseDate ? this.timeAgo(d.case.caseDate) : 'N/A',
          } as IncomingCase));
      }),
      catchError(() => of(MOCK_INCOMING))
    );
  }

  // ── Handover Cases ───────────────────────────

  getHandoverCases(): Observable<HandoverCase[]> {
    if (USE_MOCK) return of(MOCK_HANDOVER);

    return this.fetchAllDetails().pipe(
      map(details =>
        details
          .filter((d: any) => isHandover(d.case?.status))
          .map((d: any) => ({
            id:             formatCaseId(d.case.caseId),
            patient:        this.formatPatient(d.patient),
            severity:       this.normalizeSeverity(d.case.severity),
            timeInHospital: d.case.arrivedTime ? this.timeAgo(d.case.arrivedTime) : 'N/A',
            aiPrediction:   d.aiReport?.strokeType ?? 'Pending',
            nihss:          `${d.nihssAssessment?.totalScore ?? '?'} (${d.nihssAssessment?.severityLabel ?? 'N/A'})`,
            physician:      d.case.receivingPhysician ?? 'N/A',
            paramedic:      d._paramedic ?? 'N/A',
            updatedAt:      d.case.caseDate ? this.timeAgo(d.case.caseDate) : 'N/A',
          } as HandoverCase))
      ),
      catchError(() => of(MOCK_HANDOVER))
    );
  }
}

// ── ECG SERVICE ───────────────────────────────

@Injectable({ providedIn: 'root' })
export class EcgService {
  private baseUrl = `${BASE_URL}/Ecg`;

  constructor(private http: HttpClient) {}

  getEcgResultsByCase(caseId: number): Observable<EcgResult[]> {
    return this.http
      .get<EcgResult[]>(`${this.baseUrl}/case/${caseId}`)
      .pipe(catchError(() => of([])));
  }

  predictImage(caseId: number, file: File): Observable<any> {
    const form = new FormData();
    form.append('caseId', caseId.toString());
    form.append('file', file);
    return this.http.post(`${this.baseUrl}/predict-image`, form)
      .pipe(catchError(() => of(null)));
  }

  analyzeSignal(caseId: number, files: File[]): Observable<any> {
    const form = new FormData();
    form.append('caseId', caseId.toString());
    files.forEach(f => form.append('files', f));
    return this.http.post(`${this.baseUrl}/analyze`, form)
      .pipe(catchError(() => of(null)));
  }

  predictStroke(caseId: number, files: File[]): Observable<any> {
    const form = new FormData();
    form.append('caseId', caseId.toString());
    files.forEach(f => form.append('files', f));
    return this.http.post(`${this.baseUrl}/predict-stroke`, form)
      .pipe(catchError(() => of(null)));
  }
}

// ── NIHSS SERVICE ─────────────────────────────

@Injectable({ providedIn: 'root' })
export class NihssService {
  private baseUrl = `${BASE_URL}/NihssAssessments`;

  constructor(private http: HttpClient) {}

  getByCase(caseId: number): Observable<NihssAssessmentDto | null> {
    return this.http
      .get<NihssAssessmentDto>(`${this.baseUrl}/case/${caseId}`)
      .pipe(catchError(() => of(null)));
  }

  getById(nihssId: number): Observable<NihssAssessmentDto | null> {
    return this.http
      .get<NihssAssessmentDto>(`${this.baseUrl}/${nihssId}`)
      .pipe(catchError(() => of(null)));
  }

  create(dto: Partial<NihssAssessmentDto>): Observable<NihssAssessmentDto | null> {
    return this.http
      .post<NihssAssessmentDto>(this.baseUrl, dto)
      .pipe(catchError(() => of(null)));
  }

  update(nihssId: number, dto: Partial<NihssAssessmentDto>): Observable<any> {
    return this.http
      .put(`${this.baseUrl}/${nihssId}`, dto)
      .pipe(catchError(() => of(null)));
  }
}