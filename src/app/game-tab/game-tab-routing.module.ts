import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameTabPage } from './game-tab.page';

const routes: Routes = [
  {
    path: '',
    component: GameTabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameTabPageRoutingModule {}
