import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule ,Router} from '@angular/router';
import { AuthService } from '../services/services';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

 togglePassword() { 
  this.showPassword = !this.showPassword; 
  console.log('showPassword:', this.showPassword);
}
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMsg = '';

    
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Full response:', res);
        console.log('User data:', res.data?.user);
        this.authService.saveToken(res.data.token);
        this.authService.saveUser(res.data.user);
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err?.error?.message || 'Invalid email or password.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  loginWithGoogle() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }
  loginWithMicrosoft() {
    window.location.href = `${environment.apiUrl}/auth/microsoft`;
  }
  loginWithApple() {
    window.location.href = `${environment.apiUrl}/auth/apple`;
  }
}