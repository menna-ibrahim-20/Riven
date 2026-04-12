import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface NotificationItem {
  id: string;
  profile: string;
  paramedicName: string;
  paramedicId: string;
  status: 'online' | 'offline';
  caseId: string;
  ambulance: string;
  accepted: 'Accepted' | 'Rejected' | 'Pending';
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private _notifications = signal<NotificationItem[]>([
    {
      id: 'notif-1',
      profile: '/assets/Profile.svg',
      paramedicName: 'Sarah Chen',
      paramedicId: 'PM-001',
      status: 'online',
      caseId: 'A-2847',
      ambulance: 'AMB-045',
      accepted: 'Accepted',
      read: false,
    },
    {
      id: 'notif-2',
      profile: '/assets/Profile.svg',
      paramedicName: 'Sarah Chen',
      paramedicId: 'PM-001',
      status: 'online',
      caseId: 'A-2848',
      ambulance: 'AMB-045',
      accepted: 'Rejected',
      read: false,
    },
    {
      id: 'notif-3',
      profile: '/assets/Profile.svg',
      paramedicName: 'Sarah Chen',
      paramedicId: 'PM-001',
      status: 'online',
      caseId: 'A-2849',
      ambulance: 'AMB-045',
      accepted: 'Accepted',
      read: true,
    },
    {
      id: 'notif-4',
      profile: '/assets/Profile.svg',
      paramedicName: 'Sarah Chen',
      paramedicId: 'PM-001',
      status: 'online',
      caseId: 'A-2850',
      ambulance: 'AMB-045',
      accepted: 'Rejected',
      read: true,
    },
    {
      id: 'notif-5',
      profile: '/assets/Profile.svg',
      paramedicName: 'Sarah Chen',
      paramedicId: 'PM-001',
      status: 'online',
      caseId: 'A-2851',
      ambulance: 'AMB-045',
      accepted: 'Rejected',
      read: true,
    },
  ]);

  unreadCount = computed(() =>
    this._notifications().filter(n => !n.read).length
  );

  get notifications() {
    return this._notifications;
  }

  markAsRead(id: string): void {
    this._notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this._notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }

  clearAll(): void {
    this._notifications.set([]);
  }

  // TODO: لما يجهز الـ API:
  // loadFromApi(): void {
  //   this.http.get<NotificationItem[]>(`${environment.apiUrl}/notifications`)
  //     .pipe(catchError(() => of([])))
  //     .subscribe(data => this._notifications.set(data));
  // }

  constructor(private http: HttpClient) {}
}