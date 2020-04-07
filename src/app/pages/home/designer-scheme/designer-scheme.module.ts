import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignerSchemePageRoutingModule } from './designer-scheme-routing.module';

import { DesignerSchemePage } from './designer-scheme.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignerSchemePageRoutingModule
  ],
  declarations: [DesignerSchemePage]
})
export class DesignerSchemePageModule {}
