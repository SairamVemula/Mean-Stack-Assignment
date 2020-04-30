import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import {throw} from 'rxjs/Observable';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error || 'Server Error');
    }
  }

  register(userRegister) {
    console.log(userRegister);
    return this.http
      .post<Data>('http://localhost:3000/api/users/register', userRegister)
      .pipe(catchError(this.errorHandler));
  }

  login(userLogin): Observable<Data> {
    console.log(userLogin);
    return this.http
      .post<Data>('http://localhost:3000/api/users/login', userLogin)
      .pipe(catchError(this.errorHandler));
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
}

interface Data {
  success: boolean;
  message: string;
  data: Object;
  sessionToken: string;
}
