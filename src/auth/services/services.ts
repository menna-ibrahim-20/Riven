import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../environments/environments';
import {
  LoginRequest,
  SignupRequest,
  OtpRequest,
  VerifyOtpRequest,
  AuthResponse
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── LOGIN ──────────────────────────────────────────
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data);
  }

  // ── SIGNUP ─────────────────────────────────────────
  signup(data: SignupRequest): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/auth/register`,
      { email: data.email, password: data.password }
    );
  }

  // ── SEND OTP ───────────────────────────────────────
  sendOtp(data: { email: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/otp/forgot-password`,
      { email: data.email }
    );
  }

  // ── VERIFY OTP ─────────────────────────────────────
  verifyOtp(data: { contact: string, otp: string }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/otp/verify`,
      { email: data.contact, otpCode: data.otp }
    );
  }

  // ── TOKEN ──────────────────────────────────────────
  saveToken(token: string): void {
    localStorage.setItem('riven_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('riven_token');
  }

  logout(): void {
    localStorage.removeItem('riven_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}