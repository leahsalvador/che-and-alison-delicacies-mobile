import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintCalculatorPage } from './paint-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: PaintCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintCalculatorPageRoutingModule {}
