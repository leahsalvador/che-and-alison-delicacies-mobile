import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionalPaintingServicePageRoutingModule } from './professional-painting-service-routing.module';

import { ProfessionalPaintingServicePage } from './professional-painting-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionalPaintingServicePageRoutingModule
  ],
  declarations: [ProfessionalPaintingServicePage]
})
export class ProfessionalPaintingServicePageModule {}
