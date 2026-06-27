import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { WebCasesCard9SettingsComponent } from '../web-cases-card9-settings/web-cases-card9-settings.component';
import { WebCasesCard10SettingsComponent } from '../web-cases-card10-settings/web-cases-card10-settings.component';
import { LogOut1Component } from '../log-out1/log-out1.component';
import { environment } from '../../environments/environments';
import { EmergencyFabComponent } from '../../Dashboard1/emergency-fab/emergency-fab.component';

interface AccountForm {
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-root-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    WebCasesCard9SettingsComponent,
    WebCasesCard10SettingsComponent,
    LogOut1Component,
    EmergencyFabComponent,
  ],
  templateUrl: './root-settings.component.html',
  styleUrl: './root-settings.component.css'
})
export class RootSettingsComponent implements OnInit {
  @HostBinding('style.display') display = 'contents';

  showPassword = false;
  showConfirm  = false;
  isSavingAccount     = false;
  accountSavedSuccess = false;
  accountSaveError    = '';
  emailTouched   = false;
  pwTouched      = false;
  confirmTouched = false;

  accountForm: AccountForm = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ email: string }>(`${environment.apiUrl}/settings/account`)
      .subscribe({
        next: (data) => this.accountForm.email = data.email,
        error: (err) => console.error('Failed to load account', err)
      });
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  saveAccount(): void {
    this.emailTouched   = true;
    this.pwTouched      = true;
    this.confirmTouched = true;

    if (!this.isValidEmail(this.accountForm.email)) return;
    if (this.accountForm.password && this.accountForm.password.length < 6) return;
    if (this.accountForm.password !== this.accountForm.confirmPassword) return;

    this.isSavingAccount     = true;
    this.accountSavedSuccess = false;
    this.accountSaveError    = '';

    const payload = {
      email: this.accountForm.email,
      ...(this.accountForm.password ? { password: this.accountForm.password } : {})
    };

    this.http.put(`${environment.apiUrl}/settings/account`, payload)
      .subscribe({
        next: () => {
          this.isSavingAccount     = false;
          this.accountSavedSuccess = true;
          this.accountForm.password        = '';
          this.accountForm.confirmPassword = '';
          this.pwTouched      = false;
          this.confirmTouched = false;
          setTimeout(() => this.accountSavedSuccess = false, 3000);
        },
        error: (err) => {
          this.isSavingAccount  = false;
          this.accountSaveError = err?.error?.message || 'Failed to save.';
        }
      });
  }
}