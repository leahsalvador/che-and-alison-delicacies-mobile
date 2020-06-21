import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardPointsHistoryPageRoutingModule } from './reward-points-history-routing.module';

import { RewardPointsHistoryPage } from './reward-points-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardPointsHistoryPageRoutingModule
  ],
  declarations: [RewardPointsHistoryPage]
})
export class RewardPointsHistoryPageModule {}
