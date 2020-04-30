import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// const _ = require('lodash');
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  form;

  onSubmit(registerUser) {
    this.userService
      .register(
        _.pick(registerUser, ['name', 'email', 'contact_no', 'password'])
      )
      .subscribe((data) => {
        // console.log(data);
        if (data.success) {
          this.router.navigate(['/Login']);
        }
        (err) => {
          console.log("Register's Error: " + err);
          // this.registerStatus=true;
        };
      });
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[\\w\\-\\s\\/]+'),
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
        ])
      ),
      c_password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$'),
        ])
      ),
      contact_no: new FormControl(''),
    });
  }
}
