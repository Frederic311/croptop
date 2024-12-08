import { Component } from '@angular/core';
import { CropCardComponent } from "../../features/crop-card/crop-card.component";
import { CropFormComponent } from '../../features/crop-form/crop-form.component';
import { CommonModule } from '@angular/common';
import { CropService } from '../../services/crop/crop.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crop-page',
  standalone: true,
  imports: [CropCardComponent, CommonModule, RouterModule],
  templateUrl: './crop-page.component.html',
  styleUrls: ['./crop-page.component.css']
})
export class CropPageComponent {
  crops: any[] = []; // Array to hold crop data
  farms: any[] = []; // Holds farm options for the form

  constructor(private cropService: CropService) {}

  ngOnInit(): void {
    this.fetchCrops();
  }

  // Fetch all crops by farm ID
  fetchCrops() { const farmId = localStorage.getItem('farmId');
    if (farmId) { this.cropService.getCropsByFarmId(parseInt(farmId, 10)).subscribe({
       next: (data) => { this.crops = data;
        // Assign fetched crops to the list
         }, error: (err) => { console.error('Error fetching crops:', err);

          } }); } else { console.error('No farm ID found in local storage.'); } }

  // Delete a crop
  deleteCrop(id: number) {
    if (confirm('Are you sure you want to delete this crop?')) {
      this.cropService.deleteCrop(id).subscribe({
        next: () => {
          this.crops = this.crops.filter((crop) => crop.id !== id); // Remove the crop from the list
          alert('Crop deleted successfully!');
        },
        error: (err) => {
          console.error('Error deleting crop:', err);
          alert('An error occurred while trying to delete the crop.');
        }
      });
    }
  }
}
