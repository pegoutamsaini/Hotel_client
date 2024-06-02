import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      // Prevent navigating to login or signup if already logged in
      if (state.url === '/login' || state.url === '/signup') {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      // Prevent navigating to dashboard if not logged in
      if (state.url !== '/login' && state.url !== '/signup') {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
