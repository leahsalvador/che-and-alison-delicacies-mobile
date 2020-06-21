import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import {
  Router, ActivationStart, RouterOutlet
} from '@angular/router';
import {
  Component, ViewChild, OnInit
} from '@angular/core';
//API
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

// Events (iOS only)
window.addEventListener('statusTap', function () {
  console.log('statusbar tapped');
});

const {
  StatusBar
} = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage{

  //@ViewChild(RouterOutlet, {static: false}) outlet: RouterOutlet;
  isCustomer = false;

  constructor(private router: Router, private navCtrl: NavController, private nativeStorage: NativeStorage) {
    Plugins.StatusBar.setBackgroundColor({
      color: '#fa0002'
    });
    Plugins.StatusBar.setStyle({
      style: StatusBarStyle.Dark
    });

    this.nativeStorage.getItem('user_data').then(
      data => {
        const userData = data;
        console.log('User role ID ' + userData.user_role_id);
        if (userData.user_role_id == 5) {
          this.isCustomer = true;
          this.router.navigateByUrl('tabs/tabs/home');
        } else {
          this.router.navigateByUrl('tabs/tabs/order');
        }
      },
      error => console.error(error)
    );
  }
  ngOnInit() {
    /*this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'tabcontent') {
        this.outlet.deactivate();
      }
    });//*/
  }
}
