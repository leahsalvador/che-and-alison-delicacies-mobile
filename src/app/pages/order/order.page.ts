import { CallNumber } from '@ionic-native/call-number/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { OrderProductsPage } from './../modal/order-products/order-products.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MarketModel } from './../../core/interfaces/market.inferface';
import { Platform, IonInfiniteScroll, ModalController, AlertController, LoadingController } from '@ionic/angular';

import {
  AuthService
} from './../../core/services/auth.service';
import {
  OrderService
} from './../../core/services/order.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  infiniteScroll: IonInfiniteScroll;
  isCustomer = false;
  currentOrderStatusId = '1'; //for delivery
  orders: any[];
  data: any[];
  page = 0;
  maximumPages = 3;
  slice = 20;
  user_note;
  hideInfinite = false;
  /*refresh = setInterval(() => {
    console.log('Refresh PAge');
    this.getOrders(this.currentOrderStatusId);
  }, 300000);//*/

  getOrders(orderStatusId: string = '2', event ?: any): void {

    this.nativeStorage.getItem('user_data').then(data => {
      // Parameters obj-

      if(data.user_role_id == 5){
        this.isCustomer = true;
      }else{
        this.isCustomer = false;
        if(this.currentOrderStatusId == '1'){
          this.currentOrderStatusId = '2';
          orderStatusId = this.currentOrderStatusId;
        }
      }

      const params = {
        access_token : data.access_token,
        user_id : data.user_id,
        user_role_id : data.user_role_id,
        order_status_id : orderStatusId
      };
      this.spinnerDialog.show('Order', 'Loading Please wait...', true);
      this.orderService.getOrder(params)
      .subscribe(order => {
        console.log(order);
        this.orders = order;
        this.spinnerDialog.hide();
        this.loadOrders();
        try{
          event.target.complete();
        } catch(ex) {
          console.log(ex);
        }
      });
    }, (error) => {
      console.log(error);
      this.spinnerDialog.hide();
      try{
        event.target.complete();
      } catch(ex){
        console.log(ex);
      }
    });
  }


  constructor(public platform: Platform, 
              private orderService: OrderService,
              private authService: AuthService,
              private nativeStorage: NativeStorage,
              private modalController: ModalController,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private router: Router,
              private callNumber: CallNumber,
              private spinnerDialog: SpinnerDialog) {
      this.getOrders(this.currentOrderStatusId);
    //this.loadMarket();
  }

  ionViewDidEnter() {
    // Will be executed every time the user selects this tab
    // ...
    console.log('ion view entered');
    
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
    // this.getOrders(this.currentOrderStatusId);
  }

  loadOrders(event ? ) {
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
        console.log(this.orders.length);
        this.slice += 5;
        if (this.slice >= this.orders.length) {
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
    this.getOrders(this.currentOrderStatusId, event);
  }
  
  
  segmentChanged(ev: any) {
    console.log(ev.detail.value);
    this.currentOrderStatusId = ev.detail.value;
    this.getOrders(this.currentOrderStatusId);
    console.log('Segment changed', ev);
  }

  async viewProduct(order) {
    console.log(order);
    const modal = await this.modalController.create({
      component: OrderProductsPage,
      componentProps: {
        order
      }
    });
    return await modal.present();
  }
  
  async saveNote(orderData){
    
    try{
      if(orderData.driver_comment){
        const userData = await this.nativeStorage.getItem('user_data');
        
        this.spinnerDialog.show('Note', 'Processing...', true);
        this.orderService.updateNote({
          order_id: orderData.order_id,
          driver_comment: orderData.driver_comment,
          driver_id: userData.user_id,
        })
          .subscribe(res => {
            console.log(res);
            this.spinnerDialog.hide();
            try{
              if (res.error) {
                this.presentAlert('Failed!', res.error);
              } else {
                this.getOrders(this.currentOrderStatusId);
                // tslint:disable-next-line:max-line-length
                this.presentAlert('Success!', `${orderData.customer_first_name} ${orderData.customer_last_name} order note has been saved`);
              }
            } catch(ex){
              console.log(ex);
              this.presentAlert('Failed!', 'Something went wrong ');
            }
          }, (err) => {
            console.log(err);
          });
      }else{
        this.presentAlert('Failed!', `Please enter your note.`);
        this.spinnerDialog.hide();
      }
    }catch(ex){
      this.presentAlert('Failed!', `Please enter your note.`);
      this.spinnerDialog.hide();
    }
  }
  
  call(number){
    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  async reschedOrderByDriver(orderData){
    try{
      if(orderData.resched_comment){
        const userData = await this.nativeStorage.getItem('user_data');
        this.spinnerDialog.show('Reschedule Order', 'Processing...', true);
        this.orderService.reschedOrderStatus({
          order_id: orderData.order_id,
          resched_comment: orderData.resched_comment,
          driver_id: userData.user_id,
          customer_id: orderData.customer_id
        })
          .subscribe(res => {
            console.log(res);
            this.spinnerDialog.hide();
            try{
              if (res.error) {
                this.presentAlert('Failed!', res.error);
              } else {
                this.getOrders(this.currentOrderStatusId);
                // tslint:disable-next-line:max-line-length
                this.presentAlert('Success!', `${orderData.customer_first_name} ${orderData.customer_last_name} order has been reschedule`);
              }
            } catch(ex){
              console.log(ex);
              this.presentAlert('Failed!', 'Something went wrong ');
            }
          }, (err) => {
            console.log(err);
            this.spinnerDialog.hide();
          });
      }else{
        this.presentAlert('Failed!', `Please provide reason of reschedule.`);
        this.spinnerDialog.hide();
      }
    }catch(ex){

      this.presentAlert('Failed!', `Please provide reason of cancellation.`);
      this.spinnerDialog.hide();
    }
  }
  async cancelOrderByDriver(orderData){
    try{
      if(orderData.cancelled_comment){
        const userData = await this.nativeStorage.getItem('user_data');
        this.spinnerDialog.show('Cancel Order', 'Processing...', true);
        this.orderService.cancelOrderStatus({
          order_id: orderData.order_id,
          cancelled_comment: orderData.cancelled_comment,
          driver_id: userData.user_id,
          customer_id: orderData.customer_id
        })
          .subscribe(res => {
            console.log(res);
            this.spinnerDialog.hide();
            try{
              if (res.error) {
                this.presentAlert('Failed!', res.error);
              } else {
                this.getOrders(this.currentOrderStatusId);
                // tslint:disable-next-line:max-line-length
                this.presentAlert('Success!', `${orderData.customer_first_name} ${orderData.customer_last_name} order has been cancelled`);
              }
            } catch(ex){
              console.log(ex);
              this.presentAlert('Failed!', 'Something went wrong ');
            }
          }, (err) => {
            console.log(err);
            this.spinnerDialog.hide();
          });
      }else{
        this.presentAlert('Failed!', `Please provide reason of cancellation.`);
        this.spinnerDialog.hide();
      }
    }catch(ex){

      this.presentAlert('Failed!', `Please provide reason of cancellation.`);
      this.spinnerDialog.hide();
    }
  }
  
  async cancelOrder(orderData){
    
    try{
      if(orderData.cancelled_comment){
        this.spinnerDialog.show('Cancel Order', 'Processing...', true);
        this.orderService.cancelOrderStatus({
          order_id: orderData.order_id,
          cancelled_comment: orderData.cancelled_comment,
          customer_id: orderData.customer_id
        })
          .subscribe(res => {
            console.log(res);
            this.spinnerDialog.hide();
            try{
              if (res.error) {
                this.presentAlert('Failed!', res.error);
              } else {
                // tslint:disable-next-line:max-line-length
                this.presentAlert('Success!', `${orderData.customer_first_name} ${orderData.customer_last_name} order has been cancelled`);
                this.getOrders(this.currentOrderStatusId);
              }
            } catch(ex){
              console.log(ex);
              this.presentAlert('Failed!', 'Something went wrong');
            }
          }, (err) => {
            console.log(err);
          });
      }else{
        this.spinnerDialog.hide();
        this.presentAlert('Failed!', `Please provide reason of cancellation.`);
      }
    }catch(ex){
      this.spinnerDialog.hide();
      this.presentAlert('Failed!', `Please provide reason of cancellation.`);
    }
  }

  updateStatus(orderData, orderStatusId){
    this.presentAlertConfirm(orderData, orderStatusId);
  }

  async presentAlertConfirm(orderData, orderStatusId) {
    const userData = await this.nativeStorage.getItem('user_data');
    const alert = await this.alertController.create({
      header: 'Confirm Update Order Status',
      message: `Set ${orderData.customer_first_name} ${orderData.customer_last_name} order to delievered status.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
                    
            console.log(orderData);
            this.spinnerDialog.show('Note', 'Processing...', true);
            this.orderService.updateOrderStatus({
              order_status_id: orderStatusId,
              order_id: orderData.order_id,
              order_status: orderData.order_status,
              user_id: userData.user_id,
              customer_id: orderData.customer_id
            })
              .subscribe(res => {
                console.log(res);
                this.spinnerDialog.hide();
                try{
                  if (res.error) {
                    this.presentAlert('Failed!', res.error);
                  } else {
                    // tslint:disable-next-line:max-line-length
                    this.presentAlert('Success!', `${orderData.customer_first_name} ${orderData.customer_last_name} order has been delievered`);
                    this.getOrders(this.currentOrderStatusId);
                  }
                } catch(ex){
                  console.log(ex);
                  this.presentAlert('Failed!', 'Something went wrong');
                }
              }, (err) => {
                console.log(err);
                this.spinnerDialog.hide();
                this.presentAlert('Failed!', 'Something went wrong. Please check your internet connection.');
              });
          }
        }
      ]
    });

    await alert.present();
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
  
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  
  openMap(order){
    const destination = order.delivery_geoloc;

    
    if(this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
    } else {
      const label = encodeURI('Direction');

      if(destination){
        window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      }else{
        const address = order.delivery_address + ' ' + order.brgyDesc + ' ' + order.citymunDesc;
        const value = encodeURIComponent(address).replace('%20','+');
        window.open('https://www.google.com/maps?q=' + value, '_system');
      }
    }
  }
  
  openWaze(order){
    const destination = order.delivery_geoloc;
    try{
      
      const label = encodeURI('Direction');

      if(destination){
        window.open('https://www.waze.com/ul?ll=' + destination, '&z=10');
      }else{
        const address = order.delivery_address + ' ' + order.brgyDesc + ' ' + order.citymunDesc;
        const value = encodeURIComponent(address).replace('%20','+');
        window.open('https://www.waze.com/ul?q=' + address + '&navigate=yes');
      }
    }catch(ex){
      this.presentAlert('Failed!', "Can't open waze");
    }
  }
}
