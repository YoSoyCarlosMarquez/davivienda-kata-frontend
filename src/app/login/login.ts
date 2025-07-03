import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../shared/button/button';
import { TextField } from '../shared/text-field/text-field';
import { Restclient } from '../service/restclient';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, RouterModule, Button, TextField, CommonModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  constructor(private restClient: Restclient, private router: Router, private messageService: MessageService) {}

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  loading = false;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }    
    this.loginAction();
  }

  loginAction() {
    this.restClient.post(this.form.value, '/auth/login').subscribe({
      next: (res) => {
        this.loading = false;
        this.error = null;
        localStorage.setItem('user', res.data.user);
        localStorage.setItem('token', res.data.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error.data?.message || 'Credenciales inválidas';
        this.messageService.add({
          severity: 'error', // 'info' | 'warn' | 'error'
          summary: 'Oops!',
          detail: this.error!,
          life: 4000,
          
        });
      }
    });
  }

  get usernameControl(): FormControl {
    return this.form.get('username') as FormControl;
  }
  
  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  @Input() error: string | null = null;
}
