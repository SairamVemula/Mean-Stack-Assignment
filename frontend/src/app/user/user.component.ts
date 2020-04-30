import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UserService],
})
export class UserComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) {
      this.router.navigate(['/Dashboard']);
    }
  }
}
