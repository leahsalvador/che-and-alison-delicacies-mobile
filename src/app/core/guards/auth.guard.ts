import { NavController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, 
              private nativeStorage: NativeStorage,
              private navCtrl: NavController) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    console.log(localStorage.getItem('token'));

    const token = this.getToken();

    console.log('Auth Guard ' + token);
    if (this.authService.isLoggedIn || token) { 
      this.authService.isLoggedIn = true;
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    //this.router.navigate(['/login']);
    this.navCtrl.navigateRoot('/login');
    return false; 
  }

  async getToken(){
    return await this.nativeStorage.getItem('token');
  }
}
