import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../Dashboard1/Not/notification.service';


@Component({
  selector: 'app-not-bell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-bell.component.html',
  styleUrl: './not-bell.component.css'
})
export class NotBellComponent {
  @HostBinding("style.display") display = "contents";

  @Input() property11: string | number | undefined = "";
  @Input() property1: string | number | undefined = "Default";

  constructor(
    private router: Router,
    private notifService: NotificationService,
  ) {}

  unreadCount = this.notifService.unreadCount;

  goToNotifications(): void {
    this.router.navigate(['/dashboard/notifications']);
  }
}



