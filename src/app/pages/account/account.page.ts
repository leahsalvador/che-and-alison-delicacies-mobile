import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  isCustomer = false;
  constructor(private nativeStorage: NativeStorage, 
              public authService: AuthService,
              public navCtrl:NavController,
              private alertController: AlertController,
              private router: Router) {
    this.nativeStorage.getItem('user_data').then(
      data => {
        const userData = data;
        console.log(this.authService.userData);
        console.log('User role ID ' + userData.user_role_id);
        if (userData.user_role_id == 5) {
          this.isCustomer = true;
        }
      },
      error => console.error(error)
    );
   }

  ngOnInit() {
    console.log(this.authService.userData);
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

  showCompanyProfile(){    
    this.router.navigateByUrl('company-profile');
  }

  showTerms(){
    this.router.navigateByUrl('terms');
  }

  showPrivacy(){
    this.router.navigateByUrl('policy');
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

  logout() {
    this.nativeStorage.getItem('user_data').then(
      data => {
        this.authService.logout({
          access_token: data.access_token,
          user_id: data.user_id
        }).subscribe(res => {
          console.log(res);
          this.nativeStorage.clear();
          this.navCtrl.navigateRoot('login');
          this.authService.isLoggedIn = false;
        });
      },
      error => console.error(error)
    );
  }
}
