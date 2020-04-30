import { Router } from '@angular/router';
import { UserService } from './../user/user.service';
import { DashService } from './../dash.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }
  ngOnInit(): void {}
}
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   iat: number;
// }
