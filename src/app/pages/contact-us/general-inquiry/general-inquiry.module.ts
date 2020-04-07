import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralInquiryPageRoutingModule } from './general-inquiry-routing.module';

import { GeneralInquiryPage } from './general-inquiry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralInquiryPageRoutingModule
  ],
  declarations: [GeneralInquiryPage]
})
export class GeneralInquiryPageModule {}
