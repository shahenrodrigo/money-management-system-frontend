import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { NgFor } from '@angular/common';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {


  public expenseList:any =[];

  public expense: any = {

    id: null, // To handle edit operations
    title: '',
    category: '',
    description: '',
    amount: '',
    date: '',

  };

  public isEditing: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(){
    this.loadData();
  }

  public addExpense() {
    if (this.isEditing) {
      
      this.http
        .put(
          `http://localhost:8080/api/expenses/${this.expense.id}`,
          this.expense
        )
        .subscribe(
          (data) => {
            alert('Expense updated successfully');
            this.loadData();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating expense', error);
          }
        );
    } else {
      
      this.http.post('http://localhost:8080/api/expenses', this.expense).subscribe(
        (data) => {
          alert('Expense added successfully');
          this.loadData();
          this.resetForm();
        },
        (error) => {
          console.error('Error adding expense', error);
        }
      );
    }
  }

  public loadData() {

    this.http.get("http://localhost:8080/api/expenses/all").subscribe((data) => {
    
      this.expenseList = data;
      console.log('Expense list loaded', data);
    },
    (error) => {
      console.error('Error loading expense list', error);
    })
    
  }

  

  public editExpenseById(id: any) {
    this.http.get(`http://localhost:8080/api/expenses/${id}`).subscribe(
      (data: any) => {
        this.expense = { ...data }; // Pre-fill form with the selected expense
        this.isEditing = true; // Set editing mode to true
      },
      (error) => {
        console.error('Error fetching expense details', error);
      }
    );
  }


  public deleteExpenseById(id: any) {
    this.http.delete(`http://localhost:8080/api/expenses/${id}`).subscribe(
      (data) => {
        alert('Expense deleted successfully');
        this.loadData();
      },
      (error) => {
        console.error('Error deleting expense', error);
      }
    );
  }

  public resetForm() {
    this.expense = {
      id: null,
      title: '',
      category: '',
      description: '',
      amount: '',
      date: '',
    };
    this.isEditing = false;
  }
}

