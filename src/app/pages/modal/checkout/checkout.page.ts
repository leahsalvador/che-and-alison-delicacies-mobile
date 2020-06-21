import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { SERVER } from './../../../../environments/environment';
import { MapMarkerPage } from './../map-marker/map-marker.page';
import { SystemConfigService } from './../../../core/services/system-config.service';
import { AlertController, NavController } from '@ionic/angular';
import { OrderService } from './../../../core/services/order.service';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './../../../core/services/auth.service';
import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  deliveryAddress: string;
  dc = 0;
  user_note: string;
  location: string;
  server = SERVER;

  constructor(public productService: ProductService,
              public authService: AuthService,
              private orderService: OrderService,
              private systemConfigService: SystemConfigService,
              private nativeStorage: NativeStorage,
              private router: Router,
              private navCtrl: NavController,
              private alertController: AlertController,
              private spinnerDialog: SpinnerDialog) { 

                this.productService.distance = 0;
                this.productService.currentDeliveryLocation = '';
                this.user_note = '';

                this.productService.subtotal = 0;
                for(let item of this.productService.cart){
                  this.productService.subtotal += parseFloat(item.product_quantity) * parseFloat(item.product_price);
                }

                this.systemConfigService.getSystemConfig()
                .subscribe(config => {
                  console.log(config);
                  this.systemConfigService.config = config;
                  this.productService.price_per_km = parseFloat(config[0].config_value);
                  this.productService.minimum_km_flat_price = parseFloat(config[1].config_value); // minimum_km_flat_price
                  this.productService.storeLocation = config[2].config_value;
                  this.productService.storeDeliveryLocation = config[3].config_value;
                  this.productService.minimum_flat_price = parseFloat(config[4].config_value);
                  this.productService.dc = parseFloat(config[4].config_value);
                  // this.productService.price_per_km * this.productService.minimum_km_flat_price;
                  this.productService.currentTotal = +this.productService.dc + +this.productService.subtotal;
                }, (err) => {
                  console.log(err);
                  this.presentAlert('Failed!', 'Slow connection. Please check your internet and try again.');
                });
                console.log('run checkout');
                this.productService.currentDeliveryLocation = '';
              }

  ngOnInit() {
  }

  placeOrder(){

    this.spinnerDialog.show('Place Order', 'Processing...', true);
    if(this.productService.rp_used > this.authService.total_rp){
      this.presentAlert('Failed!', 'Not enough reward points');
      this.spinnerDialog.hide();
      return;
    }
    if(this.productService.rp_used < 0){
      this.presentAlert('Failed!', 'Negative input is not allowed');
      this.spinnerDialog.hide();
      return;
    }

    this.orderService.placeOrder({
      products: this.productService.cart,
      customer_id: this.authService.userData.user_id,
      delivery_address: this.authService.userData.customer.address,
      delivery_geoloc: this.productService.currentDeliveryLocation,
      reward_points: this.productService.rp_used,
      total_km: this.productService.distance,
      customer_comment: this.user_note
    })
      .subscribe(res => {
        console.log(res);
        try{
          if (res.error) {
            this.presentAlert('Failed!', res.error);
          } else {
            this.productService.cart = [];
            this.authService.total_rp -= +this.productService.rp_used;
            this.spinnerDialog.hide();
            this.presentAlert('Success!', `Your order has been placed. Delivery 1-2 days.`);
            this.navCtrl.navigateRoot('tabs/tabs/order');
          }
        } catch(ex){
          console.log(ex);
          this.spinnerDialog.hide();
          this.presentAlert('Failed!', 'Something went wrong');
        }
      }, (err) => {
        this.spinnerDialog.hide();
        this.presentAlert('Failed!', 'Something went wrong. Please try again.');
        console.log(err);
      });
  }

  checkRpInput(event){
    
  }

  setLocation(){
    this.router.navigateByUrl('map-marker');
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]
    });

    await alert.present();
  }
}

