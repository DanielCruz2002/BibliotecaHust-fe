import { Component, inject } from '@angular/core';
import { InputComponent } from "../../../component/form/input-component/input-component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [InputComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  formLogin = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });




  enviarFormLogin(){
    console.log(this.formLogin.value);
  }
}
