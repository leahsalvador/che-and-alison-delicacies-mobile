import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorCapturePage } from './color-capture.page';

const routes: Routes = [
  {
    path: '',
    component: ColorCapturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorCapturePageRoutingModule {}
