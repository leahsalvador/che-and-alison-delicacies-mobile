import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
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
  ToastController, LoadingController, NavController
} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {


  loginForm: FormGroup;
  backgroundImage = 'assets/img/background/background-5.jpg';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              public toastController: ToastController,
              public navCtrl: NavController,
              public nativeStorage: NativeStorage,
              private spinnerDialog: SpinnerDialog) {
                console.log(this.authService.isLoggedIn);
                this.nativeStorage.getItem('token').then(data => {
                  if (this.authService.isLoggedIn || data) {
                    console.log('redirect ');
                    // this.router.navigate(['tabs']);
                    this.navCtrl.navigateRoot('/tabs');
                  }//*/
                }, (error) => {
                  console.log(error);
                });
              }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    /*loading.then(() => {};
    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Logged in!',
        subTitle: 'Thanks for logging in.',
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();//*/

    this.spinnerDialog.show('Login', 'Processing...', true);
    this.authService.login(form)
      .subscribe(res => {
        console.log(res);
        try{
          if (res.user_data.access_token) {
            console.log(res);
            console.log(res.user_data);
            console.log(res.user_data.access_token);
            this.nativeStorage.setItem('token', res.user_data.access_token);
            this.nativeStorage.setItem('user_data', res.user_data);
            this.authService.userData = res.user_data;
            this.spinnerDialog.hide();
            this.presentToast('Login Successful');
            this.navCtrl.navigateRoot('/tabs');
          }
        } catch(ex){
          this.spinnerDialog.hide();
          console.log(ex);
        }
      }, (err) => {
        this.spinnerDialog.hide();
        console.log(err);
      });
  }

  register() {
    this.router.navigateByUrl('register');
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
