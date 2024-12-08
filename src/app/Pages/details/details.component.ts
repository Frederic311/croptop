import { Component,OnInit } from '@angular/core';
import { CropPageComponent } from '../crop-page/crop-page.component';
 import { HarvestComponent } from '../harvest/harvest.component';
 import { InventoryComponent } from '../inventory/inventory.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CropPageComponent,HarvestComponent,InventoryComponent,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
   selectedComponent: string = 'crops';
  // Set default component to 'crops'
   ngOnInit(): void {
    // Ensure the default component is set when the component initializes
     this.selectedComponent = 'crops'; }
      showComponent(component: string): void { this.selectedComponent = component; } }
