import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorCapturePageRoutingModule } from './color-capture-routing.module';

import { ColorCapturePage } from './color-capture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorCapturePageRoutingModule
  ],
  declarations: [ColorCapturePage]
})
export class ColorCapturePageModule {}
