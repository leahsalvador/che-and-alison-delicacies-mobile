import { AuthService } from './../services/auth.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    map,
    catchError
} from 'rxjs/operators';
import {
    Router
} from '@angular/router';
import {
    ToastController,
    AlertController,
    NavController
} from '@ionic/angular';
import {
    Injectable
} from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                public toastController: ToastController,
                public alertController: AlertController,
                private navCtrl: NavController,
                private nativeStorage: NativeStorage,
                private authService: AuthService) {}

    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

        //console.log('intercept ' + localStorage.getItem('token'));
        //const token = localStorage.getItem('token');
        let token = '';
        try{
            token = this.authService.userData.access_token;
        }catch(ex){
            token = '';
        }

        if (token && this.authService.isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        request = request.clone({
            headers: request.headers.set('Accept', 'application/json')
        });

        return next.handle(request).pipe(
            map((event: HttpEvent < any > ) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(JSON.stringify(error));
                //this.presentAlert('error', 'uout' + JSON.stringify(error));
                if (error.status === 401) {
                    try{
                        if (error.error.error.length > 0) {
                            this.presentToast(error.error.error);
                            if(error.error.error == 'Login Session Expired. Please Login Again.'){
                                this.authService.userData = null;
                                this.authService.isLoggedIn = false;
                                this.nativeStorage.clear();
                                this.navCtrl.navigateRoot('/login');
                            }
                        } else {
                            this.navCtrl.navigateRoot('/login');
                            // this.router.navigate(['login']);
                        }
                    }catch(ex){
                        this.presentToast('401:' + ex);
                    }
                }else{
                    try{
                        if (error.error.error.length > 0) {
                            this.presentToast(error.error.error);
                        }
                    }catch(ex){
                        //this.presentToast(ex);
                    }
                }
                return throwError(error);
            }));
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
}