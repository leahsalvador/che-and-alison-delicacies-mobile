import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecsWriterGuidePageRoutingModule } from './specs-writer-guide-routing.module';

import { SpecsWriterGuidePage } from './specs-writer-guide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecsWriterGuidePageRoutingModule
  ],
  declarations: [SpecsWriterGuidePage]
})
export class SpecsWriterGuidePageModule {}
