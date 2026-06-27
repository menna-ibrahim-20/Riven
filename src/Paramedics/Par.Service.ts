import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const BASE_URL = 'https://rivenbackend-production.up.railway.app/api';

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
  ambulanceId?: number;
  totalCases: number;
  avgTime: string;
  lastActive: string;
  email?: string;
  phone?: string;
}

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

  private get hospitalId(): number {
    return JSON.parse(localStorage.getItem('riven_user') || '{}')?.hospitalId ?? 0;
  }

  constructor(private http: HttpClient) {}

  private mapStatus(status: string): 'online' | 'offline' | 'enroute' {
    const s = (status ?? '').toLowerCase();
    if (s === 'online' || s === 'active')    return 'online';
    if (s === 'enroute' || s === 'en route') return 'enroute';
    return 'offline';
  }

  private calcAvgTime(cases: any[]): string {
    const diffs = cases
      .filter(c => c.onsetTime && c.handoverTime)
      .map(c => {
        const onset    = new Date(c.onsetTime).getTime();
        const handover = new Date(c.handoverTime).getTime();
        return (handover - onset) / (1000 * 60);
      })
      .filter(d => d > 0 && d < 1440);

    if (!diffs.length) return '—';
    const avg = Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
    return `${avg}m`;
  }

  getStats(): Observable<ParamedicStats> {
    return forkJoin({
      users:     this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`),
      analytics: this.http.get<any>(`${BASE_URL}/Cases/analytics/${this.hospitalId}`)
                          .pipe(catchError(() => of(null)))
    }).pipe(
      map(({ users, analytics }) => {
        const paramedics = users.filter(u =>
          u.roleId === 3 || u.roleName === 'Paramedic'
        );
        const active = paramedics.filter(u => {
          const s = (u.status ?? '').toLowerCase();
          return s === 'online' || s === 'active';
        }).length;

        return {
          total:         paramedics.length,
          active,
          avgTime:       '—',
          casesThisWeek: analytics?.weeklyCases ?? 0,
        };
      }),
      catchError(() => of(SAMPLE_STATS))
    );
  }

  getParamedics(): Observable<Paramedic[]> {
    return forkJoin({
      users:      this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`),
      ambulances: this.http.get<any[]>(`${BASE_URL}/ambulances/hospital/${this.hospitalId}`)
                           .pipe(catchError(() => of([]))),
      cases:      this.http.get<any>(`${BASE_URL}/Cases/hospital/${this.hospitalId}`)
                           .pipe(catchError(() => of([])))
    }).pipe(
      map(({ users, ambulances, cases }) => {
        const paramedics = users.filter(u =>
          u.roleId === 3 || u.roleName === 'Paramedic'
        );

        // normalize cases array
        const allCases: any[] = Array.isArray(cases)
          ? cases
          : (cases?.items ?? []);

        return paramedics.map(u => {
          const mappedStatus = this.mapStatus(u.status);

          // ── ambulance vehicle number ──
          const amb = ambulances.find((a: any) => a.ambulanceId === u.ambulanceId);
          const ambulance = amb?.vehicleNumber ?? (u.ambulanceId
            ? `AMB-${String(u.ambulanceId).padStart(3, '0')}`
            : '—');

          // ── cases for this paramedic ──
          const userCases = allCases.filter((c: any) => c.userId === u.userId);
          const totalCases = userCases.length;
          const avgTime    = this.calcAvgTime(userCases);

          // ── last active ──
          let lastActive = 'Offline';
          if (mappedStatus === 'online')  lastActive = 'Active now';
          if (mappedStatus === 'enroute') lastActive = 'En route';

          return {
            id:          `PM-${String(u.userId).padStart(3, '0')}`,
            name:        u.fullName ?? `${u.firstName} ${u.lastName}`,
            status:      mappedStatus,
            ambulance,
            ambulanceId: u.ambulanceId ?? null,
            totalCases,
            avgTime,
            lastActive,
            email:       u.email       ?? '',
            phone:       u.phoneNumber ?? '',
          } as Paramedic;
        });
      }),
      catchError(() => of(SAMPLE_PARAMEDICS))
    );
  }

  addParamedic(data: Partial<Paramedic>): Observable<any> {
    return this.http.post(`${BASE_URL}/users`, data);
  }
}