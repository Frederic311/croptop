import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CropService } from '../../services/crop/crop.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crop-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crop-form.component.html',
  styleUrl: './crop-form.component.css'
})
export class CropFormComponent {
  @Input() crop: any = {
    id: '',
    cropName: '',
    cropDescription: '',
    farm_id: null
  };

  cropForm!: FormGroup;
  farms: any[] = [];
  isEditMode = false; // Flag for determining edit vs create mode

  constructor(
    private cropService: CropService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadFarms();

    // Check if editing an existing crop
    const cropId = this.route.snapshot.paramMap.get('id');
    if (cropId) {
      this.isEditMode = true;
      this.loadCrop(+cropId);
    }
  }

  initializeForm() {
    this.cropForm = this.fb.group({
      id: [this.crop.id], // Hidden ID field
      cropName: [this.crop.cropName, Validators.required],
      cropDescription: [this.crop.cropDescription],
      farm_id: [this.crop.farm_id, Validators.required]
    });
  }

  loadFarms() {
    this.cropService.getAllFarms().subscribe({
      next: (farms) => {
        this.farms = farms;
      },
      error: (err) => console.error('Error loading farms:', err)
    });
  }

  loadCrop(cropId: number) {
    this.cropService.getCrop(cropId).subscribe({
      next: (data) => {
        this.crop = data;
        this.cropForm.patchValue(this.crop); // Pre-fill the form with crop data
      },
      error: (err) => console.error('Error loading crop:', err)
    });
  }

  onSubmit() {
    if (this.cropForm.invalid) {
      return;
    }

    const cropData = this.cropForm.value;

    if (this.isEditMode) {
      // Update existing crop
      this.cropService.updateCrop(cropData.id, cropData).subscribe({
        next: (response) => {
          console.log('Crop updated successfully:', response);
          alert('Crop updated successfully!');
          this.router.navigate(['/crop-page']);
        },
        error: (err) => {
          console.error('Error updating crop:', err);
          alert('Error updating crop!');
        }
      });
    } else {
      // Add new crop
      this.cropService.addCrop(cropData).subscribe({
        next: (response) => {
          console.log('Crop created successfully:', response);
          alert('Crop created successfully!');
          this.cropForm.reset();
          this.router.navigate(['/crop-page']);
        },
        error: (err) => {
          console.error('Error creating crop:', err);
          alert('Error creating crop!');
        }
      });
    }
  }
}
