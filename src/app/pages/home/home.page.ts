import { SERVER } from './../../../environments/environment';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from './../../core/services/auth.service';
import { ProductService } from './../../core/services/product.service';
import { MarketModel } from './../../core/interfaces/market.inferface';
import { NavController, AlertController, IonInfiniteScroll, Platform, ModalController, ToastController } from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

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
        // tslint:disable-next-line:no-string-literal
        this.productService.categories[0].products = product['lucban'];
        // tslint:disable-next-line:no-string-literal
        this.productService.categories[1].products = product['cebu'];
        // tslint:disable-next-line:no-string-literal
        this.productService.categories[2].products = product['vigan'];
        // tslint:disable-next-line:no-string-literal
        this.productService.categories[3].products = product['nueva_ecija'];
        this.productService.selectedProductCategory = this.productService.selectedProductCategory;
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
              private authService: AuthService,
              private nativeStorage: NativeStorage,
              private modalController: ModalController,
              private toastController: ToastController,
              private router: Router) {
              }

  ngOnInit() {
    this.getProducts();
  }
  

  selectProductCategory(category){
    this.productService.selectedProductCategory.active = !this.productService.selectedProductCategory.active;
    category.active = !category.active;
    this.productService.selectedProductCategory = category;
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

  increment (product) {
    
    let alreadyAdded = false;

    try{
      for(let item of this.productService.cart){
        console.log(item);
        if(item.product_id === product.product_id){
          alreadyAdded = true;
          //this.presentToast('Product Already Added');
          break;
        }
      }
    }catch(ex){
      console.log(ex);
    }

    if(alreadyAdded){
      return true;
    }
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
  }

  decrement (product) {
    console.log(product);
    
    let alreadyAdded = false;

    try{
      for(let item of this.productService.cart){
        console.log(item);
        if(item.product_id === product.product_id){
          alreadyAdded = true;
          //this.presentToast('Product Already Added');
          break;
        }
      }
    }catch(ex){
      console.log(ex);
    }

    if(alreadyAdded){
      return true;
    }
    
    try{
      if(product.product_quantity && product.product_quantity > 1){
        product.product_quantity--;
      }else{
        product.product_quantity = 1;
      }
    }catch(ex){
      product.product_quantity = 1;
    }
  }

  addToCart(index, product){
    if(this.productService.cart === undefined){
      this.productService.cart = [];
    }
    
    let alreadyAdded = false;

    try{
      for(let item of this.productService.cart){
        console.log(item);
        if(item.product_id === product.product_id){
          alreadyAdded = true;
          this.presentToast('Product Already Added');
          break;
        }
      }
    }catch(ex){
      console.log(ex);
    }

    if( ! alreadyAdded){

      try{
        if(product.product_quantity){
        }else{
          product.product_quantity = 1;
        }
      }catch(ex){
        product.product_quantity = 1;
      }
      product.subtotal = parseFloat(product.product_quantity) * parseFloat(product.product_price);
      this.productService.subtotal += product.subtotal;
      this.productService.cart.push(product);
      this.presentToast('Item successfully added to your cart.');
    }
    console.log(this.productService.cart);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
