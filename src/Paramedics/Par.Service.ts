import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ParamedicStats {
  total: number;
  active: number;
  avgTime: string;
  casesThisWeek: number;
}

export interface Paramedic {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'enroute';
  ambulance: string;
  totalCases: number;
  avgTime: string;
  lastActive: string;
}

// ✅ هنا تحط الـ URL الحقيقي بتاع الـ backend
const API_BASE = 'http://localhost:3000/api/v1'; // ← غير ده للـ URL بتاعك

const SAMPLE_STATS: ParamedicStats = {
  total: 8, active: 5, avgTime: '8.7m', casesThisWeek: 6,
};

const SAMPLE_PARAMEDICS: Paramedic[] = [
  { id: 'PM-001', name: 'Sarah Chen',   status: 'online',  ambulance: 'AMB-045', totalCases: 156, avgTime: '8.5 min', lastActive: 'Active now' },
  { id: 'PM-002', name: 'James Okafor', status: 'online',  ambulance: 'AMB-032', totalCases: 203, avgTime: '7.9 min', lastActive: 'Active now' },
  { id: 'PM-003', name: 'Maria Santos', status: 'enroute', ambulance: 'AMB-018', totalCases: 89,  avgTime: '9.2 min', lastActive: '2 min ago' },
  { id: 'PM-004', name: 'David Kim',    status: 'online',  ambulance: 'AMB-061', totalCases: 145, avgTime: '8.1 min', lastActive: 'Active now' },
  { id: 'PM-005', name: 'Aisha Patel',  status: 'offline', ambulance: 'AMB-027', totalCases: 72,  avgTime: '10.4 min', lastActive: '3h ago' },
];

@Injectable({ providedIn: 'root' })
export class ParamedicService {
  
  // ✅ هنا ترجع HttpClient
  constructor(private http: HttpClient) {}

  getStats(): Observable<ParamedicStats> {
    // ✅ هنا ترجع الـ HTTP call بدل of()
    return this.http.get<any>(`${API_BASE}/paramedics/stats`).pipe(
      map(res => ({
        total:         res.total          ?? res.totalParamedics ?? SAMPLE_STATS.total,
        active:        res.active         ?? res.activeCount     ?? SAMPLE_STATS.active,
        avgTime:       res.avgTime        ?? res.averageTime     ?? SAMPLE_STATS.avgTime,
        casesThisWeek: res.casesThisWeek  ?? res.weekCases       ?? SAMPLE_STATS.casesThisWeek,
      })),
      catchError(() => of(SAMPLE_STATS)) // لو فشل يرجع الـ sample
    );
  }

  getParamedics(): Observable<Paramedic[]> {
    // ✅ هنا ترجع الـ HTTP call بدل of()
    return this.http.get<any>(`${API_BASE}/paramedics`).pipe(
      map(res => {
        const list = Array.isArray(res) ? res : (res.data ?? res.paramedics ?? []);
        return list.map((p: any) => ({
          id:         p.id         ?? p.code     ?? '',
          name:       p.name       ?? p.fullName ?? '',
          status:     p.status     ?? 'offline',
          ambulance:  p.ambulance  ?? p.vehicle  ?? '—',
          totalCases: p.totalCases ?? p.cases    ?? 0,
          avgTime:    p.avgTime    ?? '—',
          lastActive: p.lastActive ?? p.lastSeen ?? '—',
        }));
      }),
      catchError(() => of(SAMPLE_PARAMEDICS)) // لو فشل يرجع الـ sample
    );
  }

  addParamedic(data: Partial<Paramedic>): Observable<any> {
    // ✅ هنا ترجع الـ HTTP call بدل of()
    return this.http.post(`${API_BASE}/paramedics`, data);
  }
}