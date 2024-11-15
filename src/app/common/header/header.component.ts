import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  public headerSelector: string = "DashBoard";
  public isLoggedIn: boolean = false; // Variable to hold login status

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // Subscribe to login status from AuthService
    this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  public changeSelectorHeader(menuName: string) {
    this.headerSelector = menuName;
  }
}
