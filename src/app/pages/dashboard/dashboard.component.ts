import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

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
  imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  totalBalance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;

  highestIncome = { amount: 0, date: '' };
  lowestIncome = { amount: Infinity, date: '' };

  highestExpense = { amount: 0, date: '' };
  lowestExpense = { amount: Infinity, date: '' };

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [], // X-axis: Dates
    datasets: [
      {
        data: [], // Y-axis: Balances
        label: 'Total Balance',
        fill: true,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 123, 255, 0.3)',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
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

  public lineChartType: ChartType = 'line';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadChartData();
    this.loadStatsData();
  }

  // Load chart data for the graph
  private loadChartData(): void {
    this.http.get<ChartData>('http://localhost:8080/api/stats/chart').subscribe(
      (chartData) => {
        this.lineChartData.labels = chartData.dates;
        this.lineChartData.datasets[0].data = chartData.balances;

        console.log('Chart Data:', chartData);
      },
      (error) => {
        console.error('Error fetching chart data:', error);
      }
    );
  }

  
  private loadStatsData(): void {
    this.http.get<StatData>('http://localhost:8080/api/stats').subscribe(
      (statsData) => {
        this.totalIncome = statsData.income;
        this.totalExpenses = statsData.expense;
        this.totalBalance = statsData.balance;

        
        this.highestIncome = {
          amount: statsData.maxIncome,
          date: statsData.latestIncome?.date,
        };
        this.lowestIncome = {
          amount: statsData.minIncome,
          date: statsData.latestIncome?.date,
        };

        this.highestExpense = {
          amount: statsData.maxExpense,
          date: statsData.latestExpense?.date,
        };
        this.lowestExpense = {
          amount: statsData.minExpense,
          date: statsData.latestExpense?.date,
        };

        console.log('Statistics Data:', statsData);
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }
}
