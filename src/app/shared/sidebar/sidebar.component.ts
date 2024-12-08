import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeItem: string = 'dashboard';
  isLoggedIn: boolean = false;


  constructor(private router: Router , private authService:AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  

  setActive(item: string): void {
    this.activeItem = item;
  }

  navigateToHarvest(): void {
    this.setActive('harvest');
    this.router.navigate(['/harvest']);
  }

  navigateToCrop(): void {
    this.setActive('crop');
    this.router.navigate(['/crop-page']);
  }

  navigateToInventory(): void {
    this.setActive('inventory');
    this.router.navigate(['/inventory']);
  }

  navigateToDashboard(): void {
    this.setActive('dashboard');
    this.router.navigate(['/dashboard']);
  }

  navigateToTasks(): void {
    this.setActive('tasks');
    this.router.navigate(['/tasks']);
  }

  navigateToLogout(): void {
    this.setActive('logout');
    this.authService.logout();
  }

navigateToFarms(): void{
this.setActive('farms');
this.router.navigate(['/farm'])
}
}