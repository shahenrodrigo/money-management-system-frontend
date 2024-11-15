import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { LoginComponent } from './pages/auth-app/login/login.component';
import { RegisterComponent } from './pages/auth-app/register/register.component';

export const routes: Routes = [

    {
        path: "dashboard",
        component: DashboardComponent
    },

    {
        path: 'income',
        component: IncomeComponent
    },

    {
        path: 'expense',
        component: ExpensesComponent
    },
    {
         path: 'login', component: LoginComponent
    },

    { 
        path: 'register', component: RegisterComponent 
    },

    { 
        path: '', redirectTo: '/login', pathMatch: 'full'
        
    }
];
