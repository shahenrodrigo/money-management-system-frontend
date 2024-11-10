import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
    date: ""
  };

  public isEditing: boolean = false; // To toggle between Add and Edit modes

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }


  public addIncome() {
    if (this.isEditing) {
      this.http.put(`http://localhost:8080/api/incomes/${this.income.id}`, this.income)
        .subscribe(() => {
          alert("Income updated successfully");
          this.loadData();
          this.resetForm();
        }, (error) => {
          console.error('Error updating income:', error);
        });
    } else {
      this.http.post("http://localhost:8080/api/incomes", this.income)
        .subscribe(() => {
          alert("Income added successfully");
          this.loadData();
          this.resetForm();
        }, (error) => {
          console.error('Error adding income:', error);
        });
    }
  }

  public loadData() {
    this.http.get("http://localhost:8080/api/incomes/all").subscribe((data) => {
      this.incomeList = data;
      console.log("Income list loaded:", data);
    }, (error) => {
      console.error('Error loading income list:', error);
    });
  }


  public editIncome(id: any) {
    this.http.get(`http://localhost:8080/api/incomes/${id}`).subscribe((data: any) => {
      this.income = { ...data }; // Populate the form with the selected income
      this.isEditing = true; // Switch to Edit mode
    }, (error) => {
      console.error('Error fetching income record:', error);
    });
  }


  public deleteIncome(id: any) {
    this.http.delete(`http://localhost:8080/api/incomes/${id}`).subscribe(() => {
      alert("Income deleted successfully");
      this.loadData();
    }, (error) => {
      console.error('Error deleting income:', error);
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
      date: ""
    };
    this.isEditing = false;
  }
}