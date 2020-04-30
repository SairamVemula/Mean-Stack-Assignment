import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  register(userRegister) {
    console.log(userRegister);
    return this.http.post<Data>(
      'http://localhost:3000/api/users/register',
      userRegister
    );
  }

  login(userLogin) {
    console.log(userLogin);
    return this.http.post<Data>(
      'http://localhost:3000/api/users/login',
      userLogin
    );
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
