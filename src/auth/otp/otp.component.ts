import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule ,Router} from '@angular/router';
import { AuthService } from '../services/services';

type OtpStep = 'phone' | 'email' | 'verify';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})

export class OtpComponent implements OnInit {

   step: OtpStep = 'phone';
  isLoading = false;
  phoneForm: FormGroup;
  emailForm: FormGroup;
  otpDigits: string[] = ['', '', '', ''];
  maskedContact = '';

  constructor(private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-]{7,15}$/)]]
    });
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {}

  get phone() { return this.phoneForm.get('phone')!; }
  get emailCtrl() { return this.emailForm.get('email')!; }

  sendByPhone() {
    if (this.phoneForm.valid) {
      this.isLoading = true;
      this.maskedContact = this.maskPhone(this.phone.value);
      setTimeout(() => { this.isLoading = false; this.step = 'verify'; }, 1200);
    } else { this.phoneForm.markAllAsTouched(); }
  }

  switchToEmail() { this.step = 'email'; }
  switchToPhone() { this.step = 'phone'; }

  sendByEmail() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.maskedContact = this.maskEmail(this.emailCtrl.value);
      setTimeout(() => { this.isLoading = false; this.step = 'verify'; }, 1200);
    } else { this.emailForm.markAllAsTouched(); }
  }

  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    this.otpDigits[index] = value ? value[value.length - 1] : '';
    input.value = this.otpDigits[index];
    if (this.otpDigits[index] && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      next?.focus();
    }
  }

  onDigitKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      prev?.focus();
    }
  }

  get otpComplete(): boolean { return this.otpDigits.every(d => d !== ''); }

  verify() {
    if (this.otpComplete) {
      this.isLoading = true;
      console.log('Verifying OTP:', this.otpDigits.join(''));
      setTimeout(() => { this.isLoading = false; }, 1200);
    }
  }

  resendOtp() { this.otpDigits = ['', '', '', '']; }

  private maskPhone(phone: string): string {
    const d = phone.replace(/\D/g, '');
    return '+' + d.slice(0, 3) + ' *** *** ' + d.slice(-3);
  }

  private maskEmail(email: string): string {
    const [user, domain] = email.split('@');
    return user.slice(0, 2) + '***@' + domain;
  }
}







