import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  onLogin(formValues: any) {
    this.authService.login(formValues).subscribe(response => {
      console.log('Login successful', response);
    }, error => {
      console.error('Login error', error);
    });
  }
}
