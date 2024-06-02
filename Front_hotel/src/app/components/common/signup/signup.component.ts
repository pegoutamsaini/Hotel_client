import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit {
  username: string;
  password: string;
  email: string;
  loginEmail: string;
  loginPassword: string;

  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
    this.email = '';
    this.loginEmail = '';
    this.loginPassword = '';
  }

  ngAfterViewInit(): void {
    this.signUpButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.add("right-panel-active");
    });

    this.signInButton.nativeElement.addEventListener('click', () => {
      this.container.nativeElement.classList.remove("right-panel-active");
    });

    // Add event listener for the login button in the overlay panel
    const loginButtonOverlay = this.container.nativeElement.querySelector('.overlay-panel.overlay-left button');
    loginButtonOverlay.addEventListener('click', () => {
      this.container.nativeElement.classList.remove("right-panel-active");
    });
  }


  onSubmitSignup(): void {
    if (!this.username || !this.password || !this.email) {
      return;
    }

    this.authService.signup(this.username, this.password, this.email).subscribe(
      response => {
        this.snackBar.open(response.message || 'User created successfully', 'Close', { duration: 3000 });
        console.log('Signup successful:', response);
        this.authService.setToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error => {
        const errorMessage = this.extractErrorMessage(error);
        this.snackBar.open(errorMessage, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
        console.error('Error signing up:', error);
      }
    );
  }

  onSubmitLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      return;
    }
  
    this.authService.login(this.loginEmail, this.loginPassword).subscribe(
      response => {
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        console.log('Login successful:', response);
        localStorage.setItem('token', response.token); // Store token in local storage
        this.router.navigate(['/dashboard']);
      },
      error => {
        const errorMessage = this.extractErrorMessage(error);
        this.snackBar.open(errorMessage, 'Close', { duration: 5000, panelClass: ['error-snackbar'] });
        console.error('Error logging in:', error);
      }
    );
  }
  


  private extractErrorMessage(error: any): string {
    if (error && error.error && error.error.error) {
      return error.error.error.toString();
    } else {
      return 'An error occurred';
    }
  }
}
