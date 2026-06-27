import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseRow } from './tablerow-stack/tablerow-stack.component';
import { CaseFilters } from './webcasescard1/webcasescard1.component';

export interface CaseDto {
  caseId: number;
  patientId: number;
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  userId: number;
  ambulanceId: number;
  hospitalId: number;
  hospitalName?: string;
  status: string;
  severity: string;
  aiPrediction?: string;
  strokeType?: string;
  paramedicName?: string;
  onsetTime: string;
  caseDate: string;
  location: string;
  locationLatitude?: number;
  locationLongitude?: number;
  arrivedTime?: string;
  handoverTime?: string;
  receivingPhysician?: string;
  patientConditionOnArrival?: string;
  handoverNotes?: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class CaseService {
  private baseUrl = 'https://rivenbackend-production.up.railway.app/api/cases';

  constructor(private http: HttpClient) {}

  getCases(filters?: CaseFilters, page?: number, pageSize?: number): Observable<CaseRow[]> {
    let params = new HttpParams();
    if (filters?.search)   params = params.set('search',   filters.search);
    if (filters?.severity) params = params.set('severity', filters.severity);
    if (filters?.status)   params = params.set('status',   filters.status);
    if (filters?.date) {
      const parsed = new Date(filters.date);
      if (!isNaN(parsed.getTime())) {
        params = params.set('dateFrom', parsed.toISOString());
        params = params.set('dateTo',   parsed.toISOString());
      }
    }
    if (page)     params = params.set('page',     page);
    if (pageSize) params = params.set('pageSize', pageSize);

    return this.http.get<CaseDto[] | PagedResult<CaseDto>>(this.baseUrl, { params }).pipe(
      map(res => {
        const items = Array.isArray(res) ? res : res.items;
        return items.map(c => this.toCaseRow(c));
      })
    );
  }

  private normalizeSeverity(severity: string): 'Critical' | 'High' | 'Severe' | 'Moderate' | 'Mild' {
    const map: Record<string, 'Critical' | 'High' | 'Severe' | 'Moderate' | 'Mild'> = {
      critical: 'Critical',
      high:     'High',
      severe:   'Severe',
      moderate: 'Moderate',
      mild:     'Mild'
    };
    return map[severity?.toLowerCase()] ?? 'Mild';
  }

  private normalizeStatus(status: string): 'Active' | 'En Route' | 'Completed' | 'Pending' | 'Handover' {
    const map: Record<string, 'Active' | 'En Route' | 'Completed' | 'Pending' | 'Handover'> = {
      active:    'Active',
      'en route': 'En Route',
      enroute:   'En Route',
      completed: 'Completed',
      pending:   'Pending',
      handover:  'Handover'
    };
    return map[status?.toLowerCase()] ?? 'Pending';
  }

  private toCaseRow(c: CaseDto): CaseRow {
    const age    = c.patientAge    != null ? `${c.patientAge}yo` : '';
    const gender = c.patientGender ?? '';
    const patient = [age, gender].filter(Boolean).join(', ');

    // ✅ التعديل هنا: || بدل ?? عشان تتعامل مع empty string
    const aiPrediction = c.aiPrediction || c.strokeType || '';

    return {
      id:           `SC-${new Date(c.caseDate).getFullYear()}-${c.caseId.toString().padStart(3, '0')}`,
      date:         new Date(c.caseDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day:   'numeric',
                      year:  'numeric'
                    }),
      caseDate:     c.caseDate,
      onsetTime:    c.onsetTime,
      handoverTime: c.handoverTime,
      patientAge:   age,
      patientGender: gender,
      severity:     this.normalizeSeverity(c.severity),
      aiPrediction,
      status:       this.normalizeStatus(c.status),
      paramedic:    c.paramedicName ?? '',
      patient,
    };
  }
}