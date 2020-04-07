import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaintCalculatorPageRoutingModule } from './paint-calculator-routing.module';

import { PaintCalculatorPage } from './paint-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaintCalculatorPageRoutingModule
  ],
  declarations: [PaintCalculatorPage]
})
export class PaintCalculatorPageModule {}
