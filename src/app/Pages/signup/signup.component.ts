import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, ToastModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ MessageService]
})
export class SignupComponent {
  name!: string;
  email!: string;
  password!: string;

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService) {}

  onSubmit() {

    if (!this.name || !this.email || !this.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Error',
        detail: 'All fields are required!',
      });
      return;
    }
    const userDTO = {
      fullName: this.name,
      email: this.email,
      password: this.password,
      role: 'FARMER'
    }

    this.authService.saveUser (userDTO).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User  registered successfully! Now Login' });

        // Show the message for 1.5 seconds before navigating to the login page
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // 1500 milliseconds = 1.5 seconds
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error registering user: ' + error.message });
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

 // Inside SignupComponent
 getEmailErrorMessage(emailModel: any): string {
  if (emailModel.errors?.['required']) {
    return 'Email is required.';
  }
  if (emailModel.errors?.['pattern']) {
    return 'Invalid email format. Use lowercase letters only.';
  }
  if (emailModel.errors?.['customDomain']) {
    return 'Email must end with @gmail.com.';
  }
  return '';
}


// Custom email validator
validateEmail(value: string): { [key: string]: boolean } | null {
  const lowercaseRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!value.toLowerCase().endsWith('@gmail.com')) {
    return { customDomain: true }; // Invalid domain
  }
  if (!lowercaseRegex.test(value)) {
    return { pattern: true }; // Not lowercase
  }
  return null; // Valid
}

onEmailChange(value: string): void {
  const error = this.validateEmail(value);
  const emailField = document.getElementById('email') as HTMLInputElement;

  // Add custom error messages dynamically
  if (error?.['customDomain']) {
    emailField.setCustomValidity('Email must end with @gmail.com.');
  } else if (error?.['pattern']) {
    emailField.setCustomValidity('Invalid email format. Use lowercase letters only.');
  } else {
    emailField.setCustomValidity(''); // Clear error
  }
}

}
