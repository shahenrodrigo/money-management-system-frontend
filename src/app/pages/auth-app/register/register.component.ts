import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  public user: any = {
    name: "",
    email: "",
    password: ""
  }

  constructor(private router: Router, private http: HttpClient) { }

  public isRegistrationSuccessful: boolean = false;

 async onSubmit() {
  
   await this.http.post("http://localhost:8080/api/register/addUser", this.user).subscribe(res => {
      this.isRegistrationSuccessful = true;
      this.isRegister();
    })

    
  }

  isRegister() {
    if (this.isRegistrationSuccessful) {
      alert('Registration successful! Redirecting to login page...');
      this.router.navigate(['/login']); // Navigate to login page
    } else {
      alert('Registration failed. Please try again.');
    }
  }

}








