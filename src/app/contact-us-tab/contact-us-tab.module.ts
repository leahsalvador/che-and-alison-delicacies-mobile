import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsTabPageRoutingModule } from './contact-us-tab-routing.module';

import { ContactUsTabPage } from './contact-us-tab.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    ContactUsTabPageRoutingModule
  ],
  declarations: [ContactUsTabPage]
})
export class ContactUsTabPageModule {}
