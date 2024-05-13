import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserSessionService } from './UserSessionService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSessionService: UserSessionService, private router: Router) { }

  canActivate(): boolean {
    if (!this.userSessionService.isLoggedIn()) {
      return true; // Allow access to the login page
    } else {
      this.router.navigate(['/home']); // Redirect to home page if user is logged in
      return false;
    }
  }
}
