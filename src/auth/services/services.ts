
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data).pipe(
      catchError(this.handleError)
    );
  }

  // ── SIGNUP ─────────────────────────────────────────
  signup(data: SignupRequest): Observable<AuthResponse> {
  return this.http
    .post<AuthResponse>(`${this.apiUrl}/auth/register-hospital`, {
      hospitalName: data.hospitalName,
      address: data.address,
      cityStateZip: data.cityStateZip,
      email: data.email,
      password: data.password
    })
    .pipe(catchError(this.handleError));
}

// ── SEND OTP ───────────────────────────────────────
sendOtp(data: { email?: string; phone?: string }): Observable<{ message: string }> {
  if (data.phone) {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/otp/forgot-password-sms`, {
        phoneNumber: data.phone
      })
      .pipe(catchError(this.handleError));
  }
  return this.http
    .post<{ message: string }>(`${this.apiUrl}/otp/forgot-password`, {
      email: data.email
    })
    .pipe(catchError(this.handleError));
}

  // ── VERIFY OTP ─────────────────────────────────────
  verifyOtp(data: { contact: string; otp: string }): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/otp/verify`, {
        email: data.contact,
        otpCode: data.otp
      })
      .pipe(catchError(this.handleError));
  }


  // ── TOKEN ──────────────────────────────────────────
  saveToken(token: string): void {
    localStorage.setItem('riven_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('riven_token');
  }

  saveUser(user: any): void {
  localStorage.setItem('riven_user', JSON.stringify(user));
}

getUser(): any {
  const user = localStorage.getItem('riven_user');
  return user ? JSON.parse(user) : null;
}

getHospitalId(): number | null {
  return this.getUser()?.hospitalId ?? null;
}
  logout(): void {
    localStorage.removeItem('riven_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ── ERROR HANDLER ──────────────────────────────────
  private handleError(error: HttpErrorResponse) {
    let message = 'Something went wrong, please try again';

    if (error.error instanceof ErrorEvent) {
      message = 'Please check your internet connection';
    } else if (error.status === 0) {
      message = 'Unable to reach the server';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.status === 401) {
      message = 'Invalid login credentials';
    } else if (error.status === 404) {
      message = 'Requested service not found';
    } else if (error.status >= 500) {
      message = 'Server error, please try again later';
    }

    return throwError(() => new Error(message));
  }
}
