import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfessionalPaintingServicePage } from './professional-painting-service.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalPaintingServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionalPaintingServicePageRoutingModule {}
