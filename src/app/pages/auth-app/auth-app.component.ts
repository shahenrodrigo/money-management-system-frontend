import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@Component({
  selector: 'app-auth-app',
  standalone: true,
  imports: [NgIf, LoginComponent, RegisterComponent],
  templateUrl: './auth-app.component.html',
  styleUrl: './auth-app.component.css'
})
export class AuthAppComponent {

  
}


