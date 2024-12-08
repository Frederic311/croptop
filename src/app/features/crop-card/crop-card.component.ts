import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CropService } from '../../services/crop/crop.service';

@Component({
  selector: 'app-crop-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crop-card.component.html',
  styleUrl: './crop-card.component.css'
})
export class CropCardComponent {
  @Input() crop: any = {
    id: null,
    cropName: '',
    cropDescription: '',
    imageUrl: 'assets/images/lol.png' // Default image path
  };
  constructor(private cropService: CropService, private router: Router){}
  editCrop(cropId: number): void {
    this.router.navigate(['/crop-form', cropId]);
  }

}
