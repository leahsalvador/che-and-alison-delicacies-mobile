import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralInquiryPage } from './general-inquiry.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralInquiryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralInquiryPageRoutingModule {}
