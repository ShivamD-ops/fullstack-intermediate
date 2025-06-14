import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() {
    return this.registerForm.controls;
  }
  submitForm(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.registerForm.invalid) return;
    const user = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };
    this.http.post('http://localhost:3000/users', user).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
