import { Component, OnInit } from '@angular/core';
import { ProductCatalogPage } from '../home/product-catalog/product-catalog.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.page.html',
  styleUrls: ['./home-tab.page.scss'],
})
export class HomeTabPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  
  }

  openProductCatalog() {
    this.router.navigate(['product-catalog']);
  }
  
  openChoosePaint() {
    this.router.navigate(['product-catalog']);
  }
  
  openColorCollections() {
    this.router.navigate(['product-catalog']);
  }
  
  openDesignerScheme() {
    this.router.navigate(['product-catalog']);
  }

  openSpecsWriterGuide() {
    this.router.navigate(['product-catalog']);
  }

  openPaintCalculator() {
    this.router.navigate(['product-catalog']);
  }

  openColorCapture() {
    this.router.navigate(['product-catalog']);
  }
}