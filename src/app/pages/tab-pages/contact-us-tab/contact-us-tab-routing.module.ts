import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactUsTabPage } from './contact-us-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ContactUsTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactUsTabPageRoutingModule {}
