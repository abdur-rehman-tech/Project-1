import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loading = false;
  errorMsg = '';
  successMsg = '';

  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (email === 'admin@test.com' && password === '123456') {
        localStorage.setItem('token', 'FAKE_JWT_TOKEN_123');
        this.successMsg = 'Login successful. Token saved.';
        this.router.navigate(['/admin/tools']);
      } else {
        this.errorMsg = 'Invalid email or password. Try admin@test.com / 123456';
      }
    }, 600);
  }

  logout() {
    localStorage.removeItem('token');
    this.successMsg = 'Logged out. Token removed.';
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
