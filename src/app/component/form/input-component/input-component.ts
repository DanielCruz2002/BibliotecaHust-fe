import { NgClass } from '@angular/common';
import { Component, inject, Input, OnChanges, signal, SimpleChanges,  } from '@angular/core';

import {
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';


@Component({
  selector: 'input-component',
  imports: [NgClass],
  templateUrl: './input-component.html',
})
export class InputComponent implements OnChanges, ControlValueAccessor   {

  @Input() class: string = 'relative w-full';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() status: 'none' | 'done' | 'error' = 'none';
  @Input() label: String = 'un input';

  classStatusInput = '';
  classStatusLabel = '';

  PassWordOpen = signal<boolean>(false);
  ngControl = inject(NgControl, { self: true, optional: true });
  constructor() {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['status']) {
      this.isStatus(this.status);
    }
  }


  toggleEyes(){
    this.PassWordOpen.set(!this.PassWordOpen());
  }

  isStatus(status: 'none' | 'done' | 'error') {
    if (status == 'none') {
      this.classStatusInput = 'outline-none ring-2 ring-gray-200 border-gray-500';
      this.classStatusLabel = 'peer-focus:text-gray-500 text-gray-500';
    }
    if (status == 'done') {
      this.classStatusInput = 'outline-2 outline-blue-200 ring-2 ring-blue-200 border-blue-500';
      this.classStatusLabel = 'peer-focus:text-blue-500 text-blue-500';
    }
    if (status == 'error') {
      this.classStatusInput = 'outline-2 outline-red-200 ring-2 ring-red-200 border-red-500';
      this.classStatusLabel = 'peer-focus:text-red-500 text-red-500';
    }
  }





  value: any = '';
  touched = false;
  disabled = false;

  // MÉTODOS DE ANGULAR FORMS
  onChange = (value: any) => {};
  onTouched = () => {};

  // 🔹 Cuando Angular escribe un valor en tu componente
  writeValue(value: any): void {
    this.value = value;
  }

  // 🔹 Angular le pasa una función para que notifiques cuando cambie
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // 🔹 Angular le pasa función para cuando se toque el input
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // 🔹 Deshabilitar componente
  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  // 🔹 Cuando el usuario escribe
  updateValue(event: any) {
    const value = event.target.value;
    this.value = value;
    this.onChange(value);   // <<< Notificar al formulario
    this.onTouched();       // <<< Marcar como tocado
  }

  get control() {
    return this.ngControl?.control;
  }

  get errors() {
    return this.control?.errors || null;
  }

  get hasError() {
    return this.control?.invalid && (this.control?.touched || this.control?.dirty);
  }


}
