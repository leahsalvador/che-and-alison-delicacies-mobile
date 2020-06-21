import { OrderService } from './../../../core/services/order.service';
import { SERVER } from './../../../../environments/environment';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.page.html',
  styleUrls: ['./order-products.page.scss'],
})
export class OrderProductsPage implements OnInit {

  server = SERVER;
  selectedProducts: any[];
  @Input() order: any;
  constructor(private modalCtrl: ModalController, 
              private navParams: NavParams,
              public orderService: OrderService) {
                console.log('HEllo');
                console.log(this.navParams.get('order'));
                this.order = this.navParams.get('order');
                this.orderService.getOrderProduct({
                  order_id: this.order.order_id
                })
                .subscribe(products => {
                  console.log(products);
                  this.selectedProducts = products;
                });
               }

  ngOnInit() {
    console.log('HEllod');
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
