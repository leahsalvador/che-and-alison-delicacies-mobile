import { Router } from '@angular/router';
import { ProductService } from './../../core/services/product.service';
import { AuthService } from './../../core/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  quantity: number;

  constructor(public productService: ProductService,
              private authService: AuthService,
              private nativeStorage: NativeStorage,
              private router: Router) {
    }


  ngOnInit() {
  }

  addToCart(){
    this.productService.cart.push({
      quantity: this.quantity,
      product: this.productService.currentSelectedProduct
    });
  }

  checkOut(){
    this.router.navigateByUrl('checkout');
  }
}
