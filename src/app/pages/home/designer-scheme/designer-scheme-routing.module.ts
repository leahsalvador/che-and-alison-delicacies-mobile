import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignerSchemePage } from './designer-scheme.page';

const routes: Routes = [
  {
    path: '',
    component: DesignerSchemePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignerSchemePageRoutingModule {}
