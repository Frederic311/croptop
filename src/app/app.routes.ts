import { Routes } from '@angular/router';
import { LoginComponent } from '../app/Pages/login/login.component';
import { SignupComponent } from '../app/Pages/signup/signup.component';
import { LandingpageComponent } from '../app/Pages/landingpage/landingpage.component';
import { LeftSidebarComponent } from './features/left-sidebar/left-sidebar.component';
// import { TestComponent } from './Pages/test/test.component';
import { CropPageComponent } from './Pages/crop-page/crop-page.component';
import { MainComponent } from './features/main/main.component';
import { FarmComponent } from './Pages/farm/farm.component';
// import { MainComponent } from './features/main/main.component';
// import { FarmsComponent } from './Pages/farms/farms.component';

import { InventoryComponent } from './Pages/inventory/inventory.component';
import { HarvestComponent } from './Pages/harvest/harvest.component';
import { CropFormComponent } from './features/crop-form/crop-form.component';
import { DetailsComponent } from './Pages/details/details.component';


export const routes: Routes = [
  // { path: '', component: InventoryComponent },
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sidebar', component: LeftSidebarComponent },
  {
    path: 'crop-page',
    component: CropPageComponent
  },
  // {
  //   path: 'test',
  //   component: TestComponent
  // },
  {
    path: 'crop-form',
    component: CropFormComponent
  },
  { path: 'crop-form/:id', component: CropFormComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'harvest', component: HarvestComponent },
  { path: 'farm', component: FarmComponent },
{path: "details", component: DetailsComponent}


];
