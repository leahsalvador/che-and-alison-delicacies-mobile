import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutTabPageRoutingModule } from './about-tab-routing.module';

import { AboutTabPage } from './about-tab.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    AboutTabPageRoutingModule
  ],
  declarations: [AboutTabPage]
})
export class AboutTabPageModule {}
