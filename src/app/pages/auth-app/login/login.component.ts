import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  public isLoginUser: any = {
    email: "",
    password: ""
  }

  constructor(private http: HttpClient,private authService: AuthServiceService,private router: Router) { }

  public user: any = {}



  async isLogin() {
    const data = await this.http.get(`http://localhost:8080/api/register/login/${this.user.email}`).toPromise();
    this.isLoginUser = data;
    this.validateUser();
  }

  validateUser() {
    if (this.isLoginUser.password === this.user.password) {
      alert("success login...")
      this.authService.login(this.isLoginUser);
      this.router.navigate(['dashboard']);

    }else {
      alert("incorrect username or password...")
    }
  }

}






