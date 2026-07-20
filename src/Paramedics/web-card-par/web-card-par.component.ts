import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/services';

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

private authService = inject(AuthService);

private get hospitalId(): number {
  return this.authService.getHospitalId() ?? 0;
}

  constructor(private http: HttpClient) {}

  getStats(): Observable<ParamedicStats> {
    return this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`).pipe(
      map(users => {
        const paramedics = users.filter(u => u.roleId === 3 || u.roleName === 'Paramedic');
        const active     = paramedics.filter(u => u.status === 'Active').length;
        return {
          total:         paramedics.length,
          active,
          avgTime:       '—',
          casesThisWeek: 0,
        };
      }),
      catchError(() => of(SAMPLE_STATS))
    );
  }

  getParamedics(): Observable<Paramedic[]> {
    return this.http.get<any[]>(`${BASE_URL}/users/hospital/${this.hospitalId}`).pipe(
      map(users => {
        const paramedics = users.filter(u => u.roleId === 3 || u.roleName === 'Paramedic');
        return paramedics.map(u => ({
          id:         `PM-${String(u.userId).padStart(3, '0')}`,
          name:       u.fullName ?? `${u.firstName} ${u.lastName}`,
          status:     (u.status === 'Active' ? 'online' : 'offline') as 'online' | 'offline' | 'enroute',
          ambulance:  '—',
          totalCases: 0,
          avgTime:    '—',
          lastActive: u.status === 'Active' ? 'Active now' : 'Offline',
          email:      u.email       ?? '',
          phone:      u.phoneNumber ?? '',
        }));
      }),
      catchError(() => of(SAMPLE_PARAMEDICS))
    );
  }

  addParamedic(data: Partial<Paramedic>): Observable<any> {
    return this.http.post(`${BASE_URL}/users`, data);
  }
}