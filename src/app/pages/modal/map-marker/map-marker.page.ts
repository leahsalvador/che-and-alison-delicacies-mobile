import { NavController } from '@ionic/angular';
import { MapComponent } from './../../../core/modules/map/map.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.page.html',
  styleUrls: ['./map-marker.page.scss'],
})
export class MapMarkerPage implements OnInit {

  @ViewChild(MapComponent, {static: false}) mapComponent: MapComponent;

  constructor(public productService: ProductService, public navCtrl: NavController) {

  }

  ngOnInit() {
    console.log('testestset');
  }

  reload(){
    this.mapComponent.loadMap();
  }

  markLocation(){
    console.log('Save location');
    this.productService.currentDeliveryLocation = this.mapComponent.getLocation();
    console.log('Save location ' + this.productService.currentDeliveryLocation);
    console.log('Store location ' + this.productService.storeDeliveryLocation);
    const latlong1 =  this.productService.currentDeliveryLocation.split(',');
    const latitude1 = parseFloat(latlong1[0]);
    const longitude1 = parseFloat(latlong1[1]);

    const latlong2 =  this.productService.storeDeliveryLocation.split(',');
    const latitude2 = parseFloat(latlong2[0]);
    const longitude2 = parseFloat(latlong2[1]);

    // tslint:disable-next-line:max-line-length

    // tslint:disable-next-line:max-line-length
    const meters = google.maps.geometry.spherical.computeDistanceBetween (new google.maps.LatLng(latitude1, longitude1), new google.maps.LatLng(latitude2, longitude2));
    this.productService.distance = (meters / 1000);
    this.productService.distance = parseFloat(this.productService.distance.toFixed(2));
    if(this.productService.distance <= this.productService.minimum_km_flat_price){
      // this.productService.dc = this.productService.minimum_km_flat_price * this.productService.price_per_km;
      this.productService.dc = this.productService.minimum_flat_price;
    } else {
      this.productService.dc = this.productService.minimum_flat_price;
      // tslint:disable-next-line:max-line-length
      this.productService.dc += (+this.productService.distance - +this.productService.minimum_km_flat_price) * +this.productService.price_per_km;
    }
    // tslint:disable-next-line:max-line-length
    this.productService.currentTotal = parseFloat(parseFloat((+this.productService.dc + +this.productService.subtotal).toFixed(2)).toFixed(2));
    console.log(this.productService.distance);
    this.navCtrl.back();
  }

}
