import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class Button {
  @Input() text = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: false | true = false;
  @Input() btnClass: string = 'btn btn-lg btn-lg w-100 mt-4 mb-0';
  @Output() click = new EventEmitter<void>();

  get buttonClass(): string {
    return `btn btn-lg btn-lg w-100 mt-4 mb-0 ${this.btnClass}`.trim();
  }

  get buttonDisabled(): string {
    return this.disabled ? 'disabled' : '';
  }

  handleClick(event: Event): void {
    if (this.type !== 'submit') {
      event.preventDefault();
      this.click.emit();
    }    
  }

}
