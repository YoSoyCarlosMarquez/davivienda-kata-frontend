import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss'
})
export class TextField {
  @Input() label = '';
  @Input() name = '';
  @Input() type: 'text' | 'password' = 'text';
  @Input() control!: FormControl;
}
