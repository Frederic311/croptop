import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { Farm } from '../../models/farm.model';
import { FarmService } from '../../services/farm/farm.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-farm',
  standalone: true,
  imports: [DialogModule, FormsModule, CommonModule],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  farms: Farm[] = [];
  newFarm: Farm = { id: 0, name: '', description: '', userId: 0 };
  selectedFarm: Farm = { id: 0, name: '', description: '', userId: 0 };
  user: any;
  token: string | null = localStorage.getItem('token');

  isAddFarmModalOpen = false;
  isEditFarmModalOpen = false;

  constructor(private farmService: FarmService, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.authService.getUserFromToken(this.token).subscribe(
        user => {
          this.user = user.id;
          this.getFarms();
        },
        error => {
          console.error('Error fetching user data', error);
          if (error.status === 403) {
            console.error('Access denied. Please login again.');
            // Handle 403 error (e.g., redirect to login or show error message)
          }
        }
      );
    } else {
      // Handle the case where token is not available
      console.error('Token not available, please login again.');
    }
  }

  getFarms(): void {
    if (this.token) {
      this.farmService.getAllFarms().subscribe({
        next: farms => {
          this.farms = farms.map(farm => ({ ...farm, showMenu: false })); // Initialize showMenu for each farm
        },
        error: err => console.error('Error fetching farms', err)
      });
    } else {
      console.error('Token not available, unable to fetch farms.');
    }
  }

  openAddFarmModal(): void {
    this.newFarm = { id: 0, name: '', description: '', userId: this.user || 0 };
    this.isAddFarmModalOpen = true;
  }

  addFarm(): void {
    if (this.token && this.user) {
      this.newFarm.userId = this.user;
      this.farmService.addFarm(this.newFarm).subscribe({
        next: farm => {
          this.farms.push({ ...farm, showMenu: false }); // Initialize showMenu for the new farm
          this.newFarm = { id: 0, name: '', description: '', userId: 0 };
          this.closeModal();
        },
        error: err => {
          console.error('Error adding farm', err);
          if (err.status === 403) {
            console.error('Access denied. Please check your permissions.');
          }
        }
      });
    } else {
      console.error('Token not available or user not authenticated.');
    }
  }

  openEditFarmModal(farm: Farm): void {
    this.selectedFarm = { ...farm };
    this.isEditFarmModalOpen = true;
  }

  updateFarm(): void {
    if (this.token) {
      this.farmService.updateFarm(this.selectedFarm).subscribe({
        next: farm => {
          const index = this.farms.findIndex(f => f.id === farm.id);
          if (index !== -1) {
            this.farms[index] = { ...farm, showMenu: this.farms[index].showMenu }; // Preserve showMenu state
          }
          this.selectedFarm = { id: 0, name: '', description: '', userId: 0 };
          this.closeModal();
        },
        error: err => {
          console.error('Error updating farm', err);
          if (err.status === 403) {
            console.error('Access denied. Please check your permissions.');
          }
        }
      });
    } else {
      console.error('Token not available, unable to update farm.');
    }
  }

  deleteFarm(farm: Farm): void {
    if (this.token) {
      this.farmService.deleteFarm(farm.id).subscribe({
        next: () => this.farms = this.farms.filter(f => f.id !== farm.id),
        error: err => {
          console.error('Error deleting farm', err);
          if (err.status === 403) {
            console.error('Access denied. Please check your permissions.');
          }
        }
      });
    } else {
      console.error('Token not available, unable to delete farm.');
    }
  }

  closeModal(): void {
    this.isAddFarmModalOpen = false;
    this.isEditFarmModalOpen = false;
  }

  onFileChange(event: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      localStorage.setItem('farmPicture', e.target.result); // Save image to localStorage
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  toggleMenu(farm: Farm): void {
    farm.showMenu = !farm.showMenu;
  }

  selectFarm(farmId: number): void { localStorage.setItem('farmId', farmId.toString());
    this.router.navigate(['/details']);
    // this.fetchCrops(farmId);
    // this.checkFarmIdInLocalStorage(); }
}
}