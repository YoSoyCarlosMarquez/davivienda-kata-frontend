import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Button } from '../shared/button/button';
import { TextField } from '../shared/text-field/text-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Restclient } from '../service/restclient';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [RouterModule, Button, TextField, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  constructor(private restClient: Restclient, private router: Router, private messageService: MessageService) {}

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password1: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  loading = false;

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }    
    this.registerAction();
  }

  registerAction() {
    this.restClient.post(this.form.value, '/auth/register').subscribe({
      next: (res) => {
        this.loading = false;
        this.error = null;
        this.messageService.add({
          severity: 'success', // 'info' | 'warn' | 'error'
          summary: 'Yep!',
          detail: 'Cuenta creada correctamente',
          life: 4000,
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error.data?.details || err.error.details || 'Error';
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
  
  get password1Control(): FormControl {
    return this.form.get('password1') as FormControl;
  }

  get password2Control(): FormControl {
    return this.form.get('password2') as FormControl;
  }

  @Input() error: string | null = null;

}
