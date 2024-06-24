import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = true;
  constructor(private authService: AuthService) { }

  onLogin(formValues: any) {
    this.authService.login(formValues).subscribe(response => {
      console.log('Login successful', response);
    }, error => {
      console.error('Login error', error);
    });
  }
}
