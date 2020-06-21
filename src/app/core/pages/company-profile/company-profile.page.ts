import { AlertController } from '@ionic/angular';
import { SystemConfigService } from './../../services/system-config.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePage implements OnInit {

  constructor(
    public systemConfigService: SystemConfigService,
    private alertController: AlertController
  ) { 
    
    this.systemConfigService.getSystemConfig()
    .subscribe(config => {
      console.log(config);
      this.systemConfigService.company_profile = config[6].config_value;
    }, (err) => {
      console.log(err);
      this.presentAlert('Failed!', 'Slow connection. Please check your internet and try again.');
    });
  }

  ngOnInit() {
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

}
