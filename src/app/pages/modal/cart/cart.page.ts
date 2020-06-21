import { SystemConfigService } from './../../../core/services/system-config.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ProductService } from './../../../core/services/product.service';
import { SERVER } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, Platform, ModalController } from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  infiniteScroll: IonInfiniteScroll;
  isCustomer = false;
  products: any[];
  data: any[];
  page = 0;
  maximumPages = 3;
  slice = 20;
  hideInfinite = false;
  server = SERVER;

  getProducts(event ?): void {

    this.nativeStorage.getItem('user_data').then(data => {

      this.productService.getProducts()
      .subscribe(product => {
        console.log(product);
        this.productService.products = product;
        this.loadProducts();
        try{
          event.target.complete();
        } catch(ex) {
          console.log(ex);
        }
      });
    }, (error) => {
      console.log(error);
      try{
        event.target.complete();
      } catch(ex){
        console.log(ex);
      }
    });
  }


  constructor(public platform: Platform, 
              public productService: ProductService,
              private nativeStorage: NativeStorage,
              private alertController: AlertController,
              public systemConfigService: SystemConfigService,
              private router: Router) {
                this.systemConfigService.getSystemConfig()
                .subscribe(config => {
                  console.log(config);
                  this.productService.minimum_order_price = parseFloat(config[5].config_value);
                }, (err) => {
                  console.log(err);
                  this.presentAlert('Failed!', 'Slow connection. Please check your internet and try again.');
                });
              }

  ngOnInit() {
    this.getProducts();
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
  loadProducts(event ? ) {
    console.log(event);
    if (event) {
      setTimeout(() => {
        console.log('Done');
        console.log('is hybrid ' + this.platform.is('hybrid'));
        /*if(this.platform.is('hybrid')){
          //this.infiniteScroll.complete();
        }else{ 
          event.target.complete();
        }//*/

        event.target.complete();
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        console.log(this.productService.products.length);
        this.slice += 5;
        if (this.slice >= this.productService.products.length) {
          /*if(this.platform.is('hybrid')){
            this.infiniteScroll.disabled = true;
          }else{ 
            event.target.disabled = true;
          }//*/
          event.target.disabled = true;
        }
      }, 500);
    }
  }
  
  doRefresh(event) {
    this.getProducts(event);
  }

  viewProduct(product) {
    this.productService.currentSelectedProduct = product;
    this.router.navigateByUrl('product-detail');
  }

  checkout(){
    this.productService.rp_used = 0;
    this.router.navigateByUrl('checkout');
  }
  
  increment (product) {
    console.log(product);
    try{
      if(product.product_quantity){
        product.product_quantity++;
      }else{
        product.product_quantity = 1;
        product.product_quantity++;
      }
    }catch(ex){
      product.product_quantity = 1;
      product.product_quantity++;
    }
    this.productService.subtotal += parseFloat(product.product_price);
  }

  decrement (product) {
    console.log(product);
    try{
      if(product.product_quantity && product.product_quantity > 1){
        product.product_quantity--;
        this.productService.subtotal -= parseFloat(product.product_price);
      }else{
        product.product_quantity = 1;
      }
    }catch(ex){
      product.product_quantity = 1;
    }
  }

  removeFromCart(index, product){
    console.log(this.productService.cart);
    console.log('Index ' + index);
    console.log(product);
    console.log(this.productService.cart[index]);
    product.product_quantity = 1;
    this.productService.subtotal -= product.subtotal;
    this.productService.cart.splice(index, 1);
  }
}
