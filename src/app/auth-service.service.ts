import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn = new BehaviorSubject<boolean>(false); // Default login status is false

  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();

  currentLoginStatus = this.loggedIn.asObservable();

  constructor(private router: Router) { }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable(); // Returns an observable of the login status
  }

  login(userData: any): void {
    console.log(userData);
    this.userSubject.next(userData);
    this.loggedIn.next(true); // Update login status to true
  }

  logout(): void {
    this.loggedIn.next(false); // Update login status to false
    this.router.navigate(['']);
    this.userSubject.next(null);
  }
}
