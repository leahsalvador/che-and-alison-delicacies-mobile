import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorCollectionsPage } from './color-collections.page';

const routes: Routes = [
  {
    path: '',
    component: ColorCollectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorCollectionsPageRoutingModule {}
