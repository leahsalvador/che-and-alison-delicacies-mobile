import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardPointsHistoryPage } from './reward-points-history.page';

const routes: Routes = [
  {
    path: '',
    component: RewardPointsHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardPointsHistoryPageRoutingModule {}
