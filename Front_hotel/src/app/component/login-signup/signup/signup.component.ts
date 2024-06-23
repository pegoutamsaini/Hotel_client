import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService) { }

  onSignup(formValues: any) {
    this.authService.signup(formValues).subscribe(response => {
      console.log('Signup successful', response);
    }, error => {
      console.error('Signup error', error);
    });
  }
}
