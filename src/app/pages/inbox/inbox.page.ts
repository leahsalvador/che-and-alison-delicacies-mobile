import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Platform, ModalController, AlertController, LoadingController, IonInfiniteScroll } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { OrderService } from './../../core/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  infiniteScroll: IonInfiniteScroll;
  isCustomer = false;
  currentOrderStatusId = '1'; //for delivery
  inbox: any[];
  data: any[];
  page = 0;
  maximumPages = 3;
  slice = 20;
  user_note;
  hideInfinite = false;
  refresh = setInterval(() => {
    console.log('Refresh PAge');
    this.getInbox();
  }, 300000);

  constructor(
    public platform: Platform, 
    public orderService: OrderService,
    public authService: AuthService,
    private nativeStorage: NativeStorage,
    private modalController: ModalController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ){ 
  }

  ionViewDidLoad(){
    console.log('ion view loaded');
  }

  ionViewDidEnter() {
    // Will be executed every time the user selects this tab
    // ...
    console.log('ion view entered');
    this.getInbox();
    const params = {
      access_token : this.authService.userData.access_token,
      user_id : this.authService.userData.user_id,
    };
    this.authService.getTotalRP(params)
    .subscribe(res => {
      console.log(res);
      // this.presentAlert('Failed!', JSON.stringify(res) + ' ' + this.authService.userData.user_id);
      this.authService.total_rp = res['total_reward_point'];
    });
  }

  ngOnInit() {
  }

  getInbox( event ?: any): void {

    this.nativeStorage.getItem('user_data').then(data => {
      // Parameters obj-
      const params = {
        access_token : data.access_token,
        user_id : data.user_id
      };
      this.orderService.getInbox(params)
      .subscribe(order => {
        console.log(order);
        this.inbox = order;
        this.loadInbox();
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
  loadInbox(event ? ) {
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
        console.log(this.inbox.length);
        this.slice += 5;
        if (this.slice >= this.inbox.length) {
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
    this.getInbox(event);
  }
  
  segmentChanged(ev: any) {
    this.getInbox();
    console.log('Segment changed', ev);
  }

}
