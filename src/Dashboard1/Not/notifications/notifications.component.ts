import { Component, HostBinding } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { ArrowBackComponent } from "../arrow-back/arrow-back.component";
import { CasesNotificationComponent } from "../cases-notification/cases-notification.component";
import { ClearComponent } from "../clear/clear.component";
import { NotificationService, NotificationItem } from "../notification.service";


@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, ArrowBackComponent, CasesNotificationComponent, ClearComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})

export class NotificationsComponent {
  @HostBinding("style.display") display = "contents";

  constructor(
    private router: Router,
    private notifService: NotificationService,
  ) {}

  notifications = this.notifService.notifications;

  onNotifClick(item: NotificationItem): void {
    this.notifService.markAsRead(item.id);
    // TODO: لما يجهز الـ API غير الـ caseId prefix حسب الـ format بتاعك
    this.router.navigate(['/dashboard/cases/open', `SC-2024-${item.caseId}`]);
  }

  goBack(): void {
    this.notifService.markAllAsRead();
    this.router.navigate(["/dashboard/home"]);
  }

  clearAll(): void {
    this.notifService.clearAll();
  }

  getButtonBorder(accepted: string): string {
    if (accepted === 'Accepted') return '1px solid #89d9c1';
    if (accepted === 'Rejected') return '1px solid #e68a8a';
    return '1px solid #d6dadd';
  }

  getButtonBg(accepted: string): string {
    if (accepted === 'Accepted') return '#e6f7f2';
    if (accepted === 'Rejected') return '#fdeaea';
    return '#f5f6f7';
  }

  getButtonColor(accepted: string): string {
    if (accepted === 'Accepted') return '#0fa573';
    if (accepted === 'Rejected') return '#d64545';
    return '#6b7280';
  }

  getButtonMinWidth(accepted: string): string {
    return accepted === 'Accepted' ? '75px' : '69px';
  }
}