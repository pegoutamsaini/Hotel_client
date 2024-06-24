import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup(): void {
    const user: User = { username: this.username, email: this.email, password: this.password };
    this.authService.signup(user).subscribe(
      response => {
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signup failed:', error);
      }
    );
  }
}
