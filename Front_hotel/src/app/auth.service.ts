import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './core/services/api.service';
import { User } from './core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  signup(user: User): Observable<any> {
    return this.apiService.signup(user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap(response => {
        this.cookieService.set('token', response.token, 1, '/', 'localhost', false, 'Strict');
        this.router.navigate(['/']);
      })
    );
  }

  logout(): void {
    this.cookieService.delete('token', '/', 'localhost', false, 'Strict');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }
}
