import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapMarkerPage } from './map-marker.page';

const routes: Routes = [
  {
    path: '',
    component: MapMarkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapMarkerPageRoutingModule {}
