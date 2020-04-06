import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorCollectionsPageRoutingModule } from './color-collections-routing.module';

import { ColorCollectionsPage } from './color-collections.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorCollectionsPageRoutingModule
  ],
  declarations: [ColorCollectionsPage]
})
export class ColorCollectionsPageModule {}
