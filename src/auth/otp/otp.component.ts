import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/services';

type OtpStep = 'phone' | 'email' | 'verify';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent implements OnInit, OnDestroy {
  step: OtpStep = 'phone';
  isLoading = false;
  errorMessage = '';
  phoneForm: FormGroup;
  emailForm: FormGroup;
  otpDigits: string[] = ['', '', '', '', '', ''];
  maskedContact = '';
  resendCooldown = 0;
  private contactUsed = '';
  private cooldownInterval: any;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]]
    });
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);
  }

  get phone() { return this.phoneForm.get('phone')!; }
  get emailCtrl() { return this.emailForm.get('email')!; }

  sendByPhone() {
    if (this.phoneForm.invalid) { this.phoneForm.markAllAsTouched(); return; }
    this.isLoading = true;
    this.errorMessage = '';
    const phone = this.phone.value;
    this.authService.sendOtp({ phone }).subscribe({
      next: () => {
        this.contactUsed = phone;
        this.maskedContact = this.maskPhone(phone);
        this.isLoading = false;
        this.step = 'verify';
        this.startCooldown();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  sendByEmail() {
    if (this.emailForm.invalid) { this.emailForm.markAllAsTouched(); return; }
    this.isLoading = true;
    this.errorMessage = '';
    const email = this.emailCtrl.value;
    this.authService.sendOtp({ email }).subscribe({
      next: () => {
        this.contactUsed = email;
        this.maskedContact = this.maskEmail(email);
        this.isLoading = false;
        this.step = 'verify';
        this.startCooldown();
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  switchToEmail() { this.step = 'email'; this.errorMessage = ''; }
  switchToPhone() { this.step = 'phone'; this.errorMessage = ''; }

  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '');
    const digit = raw ? raw[raw.length - 1] : '';

    this.otpDigits[index] = digit;
    input.value = digit;

    if (digit && index < 5) {
      const inputs = this.otpInputs.toArray();
      inputs[index + 1].nativeElement.focus();
      inputs[index + 1].nativeElement.value = '';
      this.otpDigits[index + 1] = '';
    }
  }

  onDigitKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace') {
      const inputs = this.otpInputs.toArray();
      if (this.otpDigits[index]) {
        this.otpDigits[index] = '';
        inputs[index].nativeElement.value = '';
      } else if (index > 0) {
        this.otpDigits[index - 1] = '';
        inputs[index - 1].nativeElement.value = '';
        inputs[index - 1].nativeElement.focus();
      }
      event.preventDefault();
    }
  }

  onDigitFocus(index: number) {
    const inputs = this.otpInputs.toArray();
    inputs[index].nativeElement.select();
  }

  get otpComplete(): boolean { return this.otpDigits.every(d => d !== ''); }

  verify() {
    if (!this.otpComplete) return;
    this.isLoading = true;
    this.errorMessage = '';
    const otp = this.otpDigits.join('');
    this.authService.verifyOtp({ contact: this.contactUsed, otp }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/reset-password']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
      }
    });
  }

  resendOtp() {
    if (this.resendCooldown > 0) return;
    this.otpDigits = ['', '', '', '', '', ''];
    setTimeout(() => {
      this.otpInputs?.toArray().forEach(input => input.nativeElement.value = '');
    });
    this.errorMessage = '';
    if (this.step === 'verify') {
      const isEmail = this.contactUsed.includes('@');
      const payload = isEmail ? { email: this.contactUsed } : { phone: this.contactUsed };
      this.authService.sendOtp(payload).subscribe({
        error: (err) => { this.errorMessage = err.message; }
      });
      this.startCooldown();
    }
  }

  private startCooldown() {
    if (this.cooldownInterval) clearInterval(this.cooldownInterval);
    this.resendCooldown = 60;
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) clearInterval(this.cooldownInterval);
    }, 1000);
  }

  private maskPhone(phone: string): string {
    const d = phone.replace(/\D/g, '');
    return '+' + d.slice(0, 3) + ' *** *** ' + d.slice(-3);
  }

  private maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    return user.slice(0, 2) + '***@' + domain;
  }
}