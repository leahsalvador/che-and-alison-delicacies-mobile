import { IonInfiniteScroll, Platform } from '@ionic/angular';
import { MarketModel } from './../../core/interfaces/market.inferface';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {

  infiniteScroll: IonInfiniteScroll;

  markets: MarketModel [];
  data: MarketModel[];
  page = 0;
  maximumPages = 3;
  slice = 5;
  hideInfinite = false;

  constructor(public platform: Platform) { 
    this.markets = [
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
      {
        name: 'Balintawak Market Last',
        image: 'assets/icon/market/market-sample.jpg',
        address: 'Lorem ipsum',
        totalSellers: 15
      },
    ];

    this.loadMarket();
  }

  ngOnInit() {
  }

  loadMarket(event?) {
    console.log(event);
    if(event){
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
        console.log(this.markets.length);
        this.slice += 5;
        if (this.slice >= this.markets.length) {
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

}
