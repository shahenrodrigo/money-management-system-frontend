import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { AuthServiceService } from '../../auth-service.service'; // Import Auth Service for user data
import { NgStyle } from '@angular/common';

interface ChartData {
  dates: string[];
  balances: number[];
}

interface StatData {
  maxIncome: number;
  minIncome: number;
  maxExpense: number;
  minExpense: number;
  income: number;
  expense: number;
  balance: number;
  latestIncome: {
    amount: number;
    date: string;
    title: string;
  };
  latestExpense: {
    amount: number;
    date: string;
    title: string;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgChartsModule,NgStyle],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  lineChartType: keyof ChartTypeRegistry = 'line';

  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  highestIncome = { amount: 0, date: '' };
  lowestIncome = { amount: Infinity, date: '' };

  highestExpense = { amount: 0, date: '' };
  lowestExpense = { amount: Infinity, date: '' };

  loginUserdata: any; // Store logged-in user data

  public expenseChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Expenses',
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        fill: true,
      },
    ],
  };

  public incomeChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Income',
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        fill: true,
      },
    ],
  };

  public chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  ngOnInit(): void {
    // Fetch user data from AuthService
    this.authService.user$.subscribe((userData) => {
      this.loginUserdata = userData;
      this.loadChartData();
      this.loadStatsData();
    });
  }

  // Load chart data for the graph
  private loadChartData(){
    this.http.get<any>(`http://localhost:8080/api/stats/chart/${this.loginUserdata.id}`).subscribe(
      (chartData) => {
        const expenseData = chartData.expenseEntityList.map((expense: any) => ({
          date: expense.date,
          amount: expense.amount,
        }));

        const incomeData = chartData.incomeEntityList.map((income: any) => ({
          date: income.date,
          amount: income.amount,
        }));

        // For Expense Chart
        this.expenseChartData.labels = expenseData.map((e: any) => e.date);
        this.expenseChartData.datasets[0].data = expenseData.map((e: any) => e.amount);

        // For Income Chart
        this.incomeChartData.labels = incomeData.map((i: any) => i.date);
        this.incomeChartData.datasets[0].data = incomeData.map((i: any) => i.amount);

        console.log('Expense Chart Data:', this.expenseChartData);
        console.log('Income Chart Data:', this.incomeChartData);
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  // Load statistics data
  private loadStatsData(){
    this.http.get<StatData>(`http://localhost:8080/api/stats/${this.loginUserdata.id}`).subscribe(
      (statsData) => {
        console.log('Received stats data:', statsData);
        
        this.totalIncome = statsData.income;
        this.totalExpenses = statsData.expense;
        this.totalBalance = statsData.balance;
  
        this.highestIncome = {
          amount: statsData.maxIncome || 0,
          date: statsData.latestIncome?.date || '',
        };
        this.lowestIncome = {
          amount: statsData.minIncome || 0,
          date: statsData.latestIncome?.date || '',
        };
  
        this.highestExpense = {
          amount: statsData.maxExpense || 0,
          date: statsData.latestExpense?.date || '',
        };
        this.lowestExpense = {
          amount: statsData.minExpense || 0,
          date: statsData.latestExpense?.date || '',
        };
      },
      (error) => {
        console.error('Error loading statistics:', error);
      }
    );
  }
}
