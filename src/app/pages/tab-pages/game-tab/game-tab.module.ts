import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameTabPageRoutingModule } from './game-tab-routing.module';

import { GameTabPage } from './game-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameTabPageRoutingModule
  ],
  declarations: [GameTabPage]
})
export class GameTabPageModule {}
