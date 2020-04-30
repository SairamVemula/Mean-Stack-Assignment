import { UserService } from './user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(): boolean {
    if (this.userService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/Login']);
      return false;
    }
  }
}
