import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameTabPageRoutingModule } from './game-tab-routing.module';

import { GameTabPage } from './game-tab.page';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    GameTabPageRoutingModule
  ],
  declarations: [GameTabPage]
})
export class GameTabPageModule {}
