import { MapComponent } from './../../../core/modules/map/map.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapMarkerPageRoutingModule } from './map-marker-routing.module';

import { MapMarkerPage } from './map-marker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapMarkerPageRoutingModule
  ],
  declarations: [MapMarkerPage, MapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapMarkerPageModule {}
