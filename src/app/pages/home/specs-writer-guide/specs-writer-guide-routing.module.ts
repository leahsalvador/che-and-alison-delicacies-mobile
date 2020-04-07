import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecsWriterGuidePage } from './specs-writer-guide.page';

const routes: Routes = [
  {
    path: '',
    component: SpecsWriterGuidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecsWriterGuidePageRoutingModule {}
