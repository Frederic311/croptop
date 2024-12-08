import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ MessageService]
})
export class LoginComponent {
  constructor(private router: Router,private authService: AuthService, private messageService: MessageService) {}
  email!: string;
  password!: string;

  onSubmit() { const authRequest = { email: this.email, password: this.password };
   this.authService.login(authRequest).subscribe( response => {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful! Redirecting...' });
    // Show the message for 1.5 seconds before navigating to the dashboard page
    setTimeout(() => { this.router.navigate(['/farm']); }, 1500);
    // 1500 milliseconds = 1.5 seconds

    // this.router.navigate(['/inventory']); //change to show defaultpage here

    }, error => { this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error logging in: ' + error.message });
  } ); }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  logout() { this.authService.logout(); this.router.navigate(['/login']); }
}
