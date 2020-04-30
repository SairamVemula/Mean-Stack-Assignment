import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  form;
  loginStatus = false;
  errMsg;
  onSubmit(loginUser) {
    this.userService.login(loginUser).subscribe(
      (data) => {
        // console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.sessionToken);
          this.loginStatus = false;
          this.router.navigate(['/Dashboard']);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.errMsg = error.error.message;
        this.loginStatus = true;
      }
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl('', Validators.required),
    });
  }
}
