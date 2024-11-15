import { Component, Type } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from "./common/header/header.component";
import { IncomeComponent } from './pages/income/income.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { RegisterComponent } from './pages/auth-app/register/register.component';
import { LoginComponent } from './pages/auth-app/login/login.component';
import { AuthAppComponent } from "./pages/auth-app/auth-app.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, IncomeComponent, ExpensesComponent, DashboardComponent, RegisterComponent, LoginComponent, AuthAppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Money-Management-System-Front-end';
}
