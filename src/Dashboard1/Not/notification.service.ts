import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environments';

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
  private _notifications = signal<NotificationItem[]>([]);

  unreadCount = computed(() =>
    this._notifications().filter(n => !n.read).length
  );

  get notifications() {
    return this._notifications;
  }

  constructor(private http: HttpClient) {
    this.loadFromApi();  // ← loads from backend automatically
  }

  loadFromApi(): void {
    this.http.get<any[]>(`${environment.apiUrl}/notifications/my`)
      .pipe(
        map(data => data.map(n => ({
          id: n.notificationId.toString(),
          profile: '/assets/Profile.svg',
          paramedicName: n.patientName ?? 'Unknown',
          paramedicId: n.userId?.toString() ?? '',
          status: 'online' as 'online',
          caseId: n.caseId?.toString() ?? '',
          ambulance: '',
          accepted: n.status === 'Accepted' ? 'Accepted'
                  : n.status === 'Rejected' ? 'Rejected'
                  : 'Pending' as 'Accepted' | 'Rejected' | 'Pending',
          read: n.isRead
        }))),
        catchError(() => of([]))
      )
      .subscribe(data => this._notifications.set(data));
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
}