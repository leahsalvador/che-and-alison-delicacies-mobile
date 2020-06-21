import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { OrderProductsPageModule } from './../modal/order-products/order-products.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderPageRoutingModule } from './order-routing.module';

import { OrderPage } from './order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderPageRoutingModule,
    OrderProductsPageModule
  ],
  providers: [SpinnerDialog, CallNumber],
  declarations: [OrderPage]
})
export class OrderPageModule {}
