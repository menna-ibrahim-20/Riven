import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/services';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password && confirm && password.value !== confirm.value) {
    confirm.setErrors({ mismatch: true });
    return { mismatch: true };
  }
  return null;
}




@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})


export class SignupComponent {
 signupForm: FormGroup;
  showPassword = false;
  showConfirm = false;
  isLoading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      hospitalName: ['', Validators.required],
      address: ['', Validators.required],
      cityStateZip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    }, { validators: passwordMatchValidator });
  }

  get hospitalName() { return this.signupForm.get('hospitalName')!; }
  get address() { return this.signupForm.get('address')!; }
  get cityStateZip() { return this.signupForm.get('cityStateZip')!; }
  get email() { return this.signupForm.get('email')!; }
  get password() { return this.signupForm.get('password')!; }
  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }
  get agreeTerms() { return this.signupForm.get('agreeTerms')!; }

  togglePassword() { this.showPassword = !this.showPassword; }
  toggleConfirm() { this.showConfirm = !this.showConfirm; }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';

    const { confirmPassword, agreeTerms, ...signupData } = this.signupForm.value;

    this.authService.signup(signupData).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Signup failed. Please try again.';
      },
      complete: () => { this.isLoading = false; }
    });
  }

  signupWithGoogle() { console.log('Google signup'); }
  signupWithMicrosoft() { console.log('Microsoft signup'); }
  signupWithApple() { console.log('Apple signup'); }
}


