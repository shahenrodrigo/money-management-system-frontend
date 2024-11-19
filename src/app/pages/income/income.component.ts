import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  public incomeList: any = [];

  public income: any = {
    id: null, // Track the current record (for editing)
    title: "",
    category: "",
    description: "",
    amount: "",
    date: "",
    userId: ''
  };

  loginUserdata: any;

  public isEditing: boolean = false; // To toggle between Add and Edit modes

  constructor(private http: HttpClient, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(userData => {
      this.loginUserdata = userData;
      this.income.userId = this.loginUserdata.id;
      this.loadData();
    });
  }

  public addIncome() {
    if (this.isEditing) {
      this.http.put(`http://localhost:8080/api/incomes/${this.income.id}`, this.income)
        .subscribe({
          next: () => {
            alert("Income updated successfully");
            this.loadData(); // Reload the updated data
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating income:', error);
          }
        });
    } else {
      this.http.post("http://localhost:8080/api/incomes", this.income)
        .subscribe({
          next: () => {
            alert("Income added successfully");
            this.loadData(); // Reload the data
            this.resetForm(); // Reset form after adding
          },
          error: (error) => {
            console.error('Error adding income:', error);
          }
        });
    }
  }

  public loadData() {
    this.http.get(`http://localhost:8080/api/incomes/get-all/${this.loginUserdata.id}`).subscribe({
      next: (data) => {
        this.incomeList = data; // Update the income list
        console.log("Income list loaded:", data);
      },
      error: (error) => {
        console.error('Error loading income list:', error);
      }
    });
  }

  public editIncome(id: any) {
    this.http.get(`http://localhost:8080/api/incomes/${id}`).subscribe({
      next: (data: any) => {
        this.income = { ...data }; // Populate the form with the selected income
        this.isEditing = true; // Switch to Edit mode
      },
      error: (error) => {
        console.error('Error fetching income record:', error);
      }
    });
  }

  public deleteIncome(id: any) {
    this.http.delete(`http://localhost:8080/api/incomes/${id}`).subscribe({
      next: () => {
        alert("Income deleted successfully");
        this.loadData(); // Reload the data after deletion
      },
      error: (error) => {
        console.error('Error deleting income:', error);
      }
    });
  }

  // Reset the form and toggle back to Add mode
  public resetForm() {
    this.income = {
      id: null,
      title: "",
      category: "",
      description: "",
      amount: "",
      date: "",
      userId: this.loginUserdata.id // Keep the userId for new income
    };
    this.isEditing = false;
  }
}
