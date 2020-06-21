import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderProductsPageRoutingModule } from './order-products-routing.module';

import { OrderProductsPage } from './order-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderProductsPageRoutingModule
  ],
  declarations: [OrderProductsPage]
})
export class OrderProductsPageModule {}
