import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { API_SERVER } from './../../../environments/environment';
import { LocationService } from './../../core/services/location.service';
import {
  AuthService
} from './../../core/services/auth.service';
import {
  Router
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  NgForm
} from '@angular/forms';
import {
  ToastController,
  AlertController,
  NavController
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              public locationService: LocationService,
              private navCtrl: NavController,
              public toastController: ToastController,
              public alertController: AlertController,
              private spinnerDialog: SpinnerDialog) {

    console.log(this.authService.isLoggedIn);
    if (this.authService.isLoggedIn) {
      console.log('redirect ');
      //this.router.navigate(['tabs']);
      this.navCtrl.navigateRoot('/tabs');
    }

    this.locationService.getCity()
    .subscribe(cities => {
      console.log(cities);
      this.locationService.cities = cities;
      //this.presentAlert('Success', 'yey');
    }, (err) => {
      console.log(err);
      this.presentAlert('Failed', 'Something went wrong.');
      //this.presentAlert('Failed', API_SERVER);
      /*try{
        this.presentAlert('Failed', err.error.error);
      }catch(ex){
        this.presentAlert('You are now registered', 'Please login with your username and password');
      }//*/
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      contact_number: [null, Validators.required],
      address: [null, Validators.required],
      citymunCode: [null, Validators.required],
      brgyCode: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    });

  }

  onFormSubmit(form: NgForm) {
    this.spinnerDialog.show('Register', 'Processing...', true);
    this.authService.register(form)
      .subscribe(response => {
        console.log(response);
        this.spinnerDialog.hide();
        this.presentAlert('You are now registered', 'Please login with your username and password');
        this.login();
      }, (err) => {
        this.spinnerDialog.hide();
        console.log(err);
        /*try{
          this.presentAlert('Failed', err.error.error);
        }catch(ex){
          this.presentAlert('You are now registered', 'Please login with your username and password');
        }//*/
      });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
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

  login() {
    this.navCtrl.pop();
  }

  updateBarangayList(event ? ){
    this.locationService.getBarangay({
      citymunCode: event.detail.value
    })
    .subscribe(brgys => {
      console.log(brgys);
      this.locationService.brgys = brgys;
    });
  }
  
  showTerms(){
    this.router.navigateByUrl('terms');
  }

  showPrivacy(){
    this.router.navigateByUrl('policy');
  }
}