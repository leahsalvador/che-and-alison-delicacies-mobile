import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoosePaintPageRoutingModule } from './choose-paint-routing.module';

import { ChoosePaintPage } from './choose-paint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoosePaintPageRoutingModule
  ],
  declarations: [ChoosePaintPage]
})
export class ChoosePaintPageModule {}
