import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/services';


@Component({
  selector: 'app-log-out1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-out1.component.html',
  styleUrl: './log-out1.component.css'
})
export class LogOut1Component {
  @HostBinding('style.display') display = 'contents';
  @Input() text = 'Log Out';
  @Input() property1: string | number | undefined = 'Default';

  isLoggingOut = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogOut(): void {
    this.isLoggingOut = true;
    // TODO: this.http.post(`${environment.apiUrl}/auth/logout`, {}).subscribe();
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }, 600);
  }
}
